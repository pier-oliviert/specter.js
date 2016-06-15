
class MutationObserver {

  constructor(callback) {
    this.callback = callback;
    this.observer = new MutationObserver.native(function() {});
  }

  observe(target, config) {
    this.node = target;
    this.observer.observe(target, config);
    window.Specter.mutations.add(this);
  }

  disconnect() {
    this.observer.disconnect();
    window.Specter.mutations.remove(this);
  }

  takeRecords() {
    return this.observer.takeRecords();
  }
}

MutationObserver.native = window.MutationObserver;
window.MutationObserver = MutationObserver;
