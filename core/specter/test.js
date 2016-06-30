class Test {
  constructor() {
    this.xhr = {}
  }

  prepare() {
    this.workspace = document.querySelector('[data-workspace]');
    this.expected = document.querySelector('[data-expected]');
    this.expected.remove();

    delete this.workspace.dataset.workspace;
    delete this.expected.dataset.expected;
  }

  setup() {
  }

  execute() {
  }
}

window.Specter.Test = new Test();
