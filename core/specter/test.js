class Test {
  constructor() {
    this.xhr = {}
    this.assert = new Specter.Assertions();
    this.workspace = document.querySelector('[data-workspace]');
    this.expected = document.querySelector('[data-expected]');
    this.expected.remove();

    delete this.workspace.dataset.workspace;
    delete this.expected.dataset.expected;
  }

  setup() {
  }

  test() {
  }
}

window.Specter.Test = Test;
