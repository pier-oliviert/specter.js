class Runner {
  constructor(button, tests) {
    if (!button || tests.length === 0) {
      return;
    }


    this.button = button
    this.tests = tests

    this.button.addEventListener('click', this.start.bind(this));
  }

  start() {
    if (this.button.dataset.running !== 'false') {
      return
    }

    this.button.dataset.running = 'true'
    this.count = this.tests.length

    for (var i = 0; i < this.count; i++) {
      var test = this.tests[i]
      test.querySelector('div.status').textContent = ''
      test.dataset.status = 'started'
      var iframe = document.createElement('iframe')
      iframe.src = test.dataset.run
      iframe.style.display = 'none'
      document.body.appendChild(iframe)

      test.iframe = iframe
      iframe.contentWindow.addEventListener('error', this.received.bind(this, test))
      window.addEventListener('message', this.received.bind(this, test));
    }
  }

  received(test, event) {
    if (!event.data) {
      this.failed(test, event.message)
      return
    }

    if (test.dataset.run !== event.data.reference) {
      return
    }

    this.count -= 1
    test.iframe.remove()

    switch(event.data.status) {
      case 'success':
        test.dataset.status = 'success'
        var status = test.querySelector('div.status')
        status.textContent = status.dataset.success
        break
      default:
        this.failed(test, event.data.error)
    }

    if (this.count <= 0) {
      this.button.dataset.running = 'false'
    }
  }

  failed(test, message) {
    test.dataset.status = 'failed'
    var status = test.querySelector('div.status')
    status.textContent = status.dataset.error
    var span = test.querySelector('div > span')
    span.textContent = message
  }
}

(function(window, document) {
  window.Runner = new Runner(document.querySelector('#Run'), document.querySelectorAll('.test'))

})(window, document)
