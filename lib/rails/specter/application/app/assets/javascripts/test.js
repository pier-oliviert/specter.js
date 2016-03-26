//= require 'vendors/prism.js'

(function(window, document) {
  class Test {
    constructor(element) {
      window.addEventListener('message', this.received.bind(this), false);
    }

    received(message) {
      var result = this.readableOutput(message.source.document.querySelector('#SpecterTestWrapper > div').innerHTML)
      var container = document.querySelector('#Test section.result')
      var header = container.querySelector('header')
      var code = container.querySelector('pre.real > code')
      var pres = container.querySelectorAll('pre')
      var line = this.lineNumber(result, message.data.html)

      code.textContent = result

      if (message.data.status == 'error') {
        Array.prototype.forEach.call(pres, function(pre) {
          pre.dataset.line = line
        }, this)

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
