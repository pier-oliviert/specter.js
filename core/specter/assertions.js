class Assertions {
  constructor() {
  }

  that(bool) {
    if (!bool) {
      throw "Expected to be true"
    }
  }

  count(collection, count, message = null) {
    var length = Array.prototype.slice.call(collection).length
    if (length != count) {
      throw "Expected " + count + " objects in the collection: " + message;
    }
  }
};

window.Specter.Assertions = Assertions;
