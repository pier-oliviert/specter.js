test.setup()
var run = function() {
  test.execute()

  var wrapper = document.getElementById('SpecterTestWrapper')
  var real = wrapper.children[0]
  var expected = wrapper.children[1]
  expected.remove()

  try {
    Specter.compare(real, expected)
    if (window.parent !== undefined) {
      window.parent.postMessage({
        status: 'success'
      }, '*')
    } else {
      console.log("Test successfully complete")
    }
  } catch(e) {
    if (window.parent !== undefined) {
      window.parent.postMessage({
        status: 'error',
        error: e.toString(),
        html: e.node().outerHTML
      }, '*')
    } else {
      console.log(e)
    }
  }
}

window.setTimeout(run, 50)
