class Runner {
  constructor(button, tests) {
    if (!button || tests.length === 0) {
      return;
    }


    this.button = button
    this.tests = tests

    this.button.addEventListener('click', this.start.bind(this));
    window.addEventListener('message', this.received.bind(this), false);
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
      iframe.contentWindow.listElement = test
    }
  }

  received(message) {
    var test = message.source.listElement

    if (message.data.status === 'success') {
      test.dataset.status = 'success'
      var status = test.querySelector('div.status')
      status.textContent = status.dataset.success
    }
    else {
      test.dataset.status = 'failed'
      var status = test.querySelector('div.status')
      status.textContent = status.dataset.error
      var span = test.querySelector('div > span')
      span.textContent = message.data.error
    }

    this.count -= 1
    message.source.listElement.iframe.remove()

    if (this.count <= 0) {
      this.button.dataset.running = 'false'
    }
  }
}

(function(window, document) {
  window.Runner = new Runner(document.querySelector('#Run'), document.querySelectorAll('.test'))

})(window, document)
