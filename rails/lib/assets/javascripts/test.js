//= require 'vendors/prism.js'

(function(window, document) {
  class Test {
    constructor(element) {
      window.addEventListener('message', this.received.bind(this), false);
      var iframe = document.querySelector('iframe')
      iframe.contentWindow.addEventListener('error', this.failed.bind(this, iframe))
    }

    failed(iframe, event) {

      var container = document.querySelector('#Test section.result')
      var header = container.querySelector('header')
      header.classList.add('error')
      header.querySelector('div.status').textContent = "❌"
      header.querySelector('div.message').textContent = event.message

      container.querySelector('pre.actual > code').textContent = this.readableOutput(iframe.contentWindow.document.body.innerHTML)
      container.querySelector('pre.expected').remove()
    }

    received(message) {
      document.querySelector('section.result pre.actual > code').textContent = this.readableOutput(message.data.actual)
      document.querySelector('section.result pre.expected > code').textContent = this.readableOutput(message.data.expected)
      var container = document.querySelector('#Test section.result')
      var header = container.querySelector('header')
      var code = container.querySelector('pre.real > code')
      var pres = container.querySelectorAll('pre')

      if (message.data.status == 'error') {

        header.classList.add('error')
        header.querySelector('div.status').textContent = "❌"
        header.querySelector('div.message').textContent = message.data.error
      }
      else {
        header.classList.add('success')
        header.querySelector('div.status').textContent = "✓"
        header.querySelector('div.message').textContent = "The test has passed"
        container.querySelector('pre.expected').remove()
      }
      Array.prototype.forEach.call(pres, function(pre) {
        this.parse(pre)
      }, this)
    }

    readableOutput(str) {
      return str.replace(/></gi, ">\n<").trim()
    }

    lineNumber(code, str) {
      var num = 1

      code.split("\n").forEach(function(text, line) {
        if (str == text) {
          num = line
        }
      })

      return num
    }

    parse(pre) {
      var code = pre.querySelector('code')
      var line = parseInt(pre.dataset.line)

      Prism.highlightElement(code)

      if (line > 0) {
        this.showErrorOnLineNumber(code, line)
      }
    }

    showErrorOnLineNumber(code, lineNumber) {
      var elements = []
      var error = document.createElement('span')
      var count = 0

      for (var i = 0; i < code.childNodes.length && count <= lineNumber; i++) {
        var node = code.childNodes[i]

        if (count == lineNumber) {
          elements.push(node)
        }

        if (node.nodeType === node.TEXT_NODE && node.textContent === "\n") {
          count += 1
        }
      }

      if (elements.length === 0) {
        return
      }

      error.classList.add('error')
      code.insertBefore(error, elements[0])

      for (var i = 0; i < elements.length; i++) {
        error.appendChild(elements[i])
      }

      code.querySelector('span.line-numbers-rows').children[lineNumber].classList.add('error')

    }
  }

  var element = document.getElementById('Test')
  if (element) {
    window.Test = new Test(element)
  }

})(window, document)
