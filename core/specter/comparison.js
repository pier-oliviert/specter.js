Specter = window.Specter;

Specter.compare = function(real, expected) {
  if (real.childNodes.length > 0) {
    removeBlankNode(real);
    removeBlankNode(expected);

    forceTextNodeOnEmptyNode(real);
    forceTextNodeOnEmptyNode(expected);

    compareChildren(real, expected);

    for (var i = 0; i < real.childNodes.length; i++) {
      Specter.compare(real.childNodes[i], expected.childNodes[i]);
    }
  }

  compareElement(real, expected)
  compareAttributes(real, expected)
  compareTextContent(real, expected)

  return true;
}

function compareChildren(node, expected) {
  if (node) {
    node.normalize();
  }

  if (expected) {
    expected.normalize();
  }

  if ((node.childNodes || []).length !== (expected.childNodes || []).length) {
    throw new Specter.Error(node, expected, "Not the same number of child")
  }
}

function compareAttributes(node, expected) {
  if ((node.attributes || []).length !== (expected.attributes || []).length) {
    throw new Specter.Error(node, expected, "Not the same number of attributes expected")
  }

  Array.prototype.forEach.call(expected.attributes || [], function(attribute) {
    if (node.getAttribute(attribute.name) !== attribute.value) {
      throw new Specter.Error(node, expected, "Attributes do not match")
    }
  })
}

function compareElement(node, expected) {
  if (node.nodeName !== expected.nodeName) {
    throw new Specter.Error(node, expected, "Unexpected element")
  }

  if (node.childNodes.length !== expected.childNodes.length) {
    throw new Specter.Error(node, expected, "Not same amount of children")
  }
}

function compareTextContent(node, expected) {
  if (node.nodeType === Element.TEXT_NODE) {
    if (node.textContent.trim() !== expected.textContent.trim()) {
      throw new Specter.Error(node.parentElement, expected.parentElement, "The text content is not identical")
    }
  }
}

function forceTextNodeOnEmptyNode(node) {
  if (!node) {
    return;
  }

  if (node.nodeType === Element.ELEMENT_NODE && node.childNodes.length === 0) {
    node.appendChild(document.createTextNode(''))
  }
}

function removeBlankNode(node) {
  if (!node) {
    return;
  }

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

