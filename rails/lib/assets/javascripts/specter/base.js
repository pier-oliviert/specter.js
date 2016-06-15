class Specter {
  constructor() {
    this.tests = [];
  }

  test(description, test) {
    this.tests.push({
      name: description,
      test: test
    });
  }

  run() {
    this.tests.forEach(function(struct) {
      struct.test.setup()
      while (window.Specter.events.any()) {
        window.Specter.events.dispatch();
        window.Specter.mutations.dispatch();
        window.Specter.requests.dispatch();
      }

      struct.test.test()
      window.Specter.compare(struct.test.workspace.cloneNode(true), struct.test.expected);
    });
  }
}

window.Specter = new Specter();

