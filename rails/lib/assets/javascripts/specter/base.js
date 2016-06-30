class Specter {
  run() {
    var test = window.Specter.Test
    test.prepare()
    test.setup()
    while (window.Specter.events.any()) {
      window.Specter.events.dispatch();
      window.Specter.mutations.dispatch();
      window.Specter.requests.dispatch();
    }

    test.execute(new window.Specter.Assertions());
    window.Specter.compare(test.workspace.cloneNode(true), test.expected);
  }
}

window.Specter = new Specter();
