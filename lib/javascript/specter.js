window.Specter = {}

Specter.compare = function(real, expected) {
  Specter.removeBlankNode(real)
  Specter.removeBlankNode(expected)

  Specter.forceTextNodeOnEmptyNode(real)
  Specter.forceTextNodeOnEmptyNode(expected)

  Specter.compare.element(real, expected)
  Specter.compare.attributes(real, expected)
  Specter.compare.textContent(real, expected)

  for (i = 0; i < real.childNodes.length; i++) {
    Specter.compare(real.childNodes[i], expected.childNodes[i]);
  }

  return true;
}

Specter.compare.attributes = function(node, expected) {
  if ((node.attributes || []).length !== (expected.attributes || []).length) {
    throw new Specter.Error(node, expected, "Not the same number of attributes expected")
  }

  Array.prototype.forEach.call(expected.attributes || [], function(attribute) {
    if (node.getAttribute(attribute.name) !== attribute.value) {
      throw new Specter.Error(node, expected, "Attributes do not match")
    }
  })
}

Specter.compare.element = function(node, expected) {
  if (node.nodeName !== expected.nodeName) {
    throw new Specter.Error(node, expected, "Unexpected element")
  }

  if (node.childNodes.length !== expected.childNodes.length) {
    throw new Specter.Error(node, expected, "Not same amount of children")
  }
}

Specter.compare.textContent = function(node, expected) {
  if (node.nodeType === Element.TEXT_NODE) {
    if (node.textContent.trim() !== expected.textContent.trim()) {
      throw new Specter.Error(node.parentElement, expected.parentElement, "The text content is not identical")
    }
  }
}

Specter.forceTextNodeOnEmptyNode = function(node) {
  if (node.nodeType === Element.ELEMENT_NODE && node.childNodes.length === 0) {
    node.appendChild(document.createTextNode(''))
  }
}

Specter.removeBlankNode = function(node) {
  Array.prototype.forEach.call(node.childNodes || [], function(node) {
    if (node.textContent.length === 0 || /^\s*$/.test(node.textContent)) {
      node.remove();
    }
  })
}

Specter.Error = function(node, expected, message) {
  this.expected = expected

  this.node = function() {
    return node
  }

  this.message = function() {
    return message
  }

  this.toString = function() {
    return this.message()
  }
}
