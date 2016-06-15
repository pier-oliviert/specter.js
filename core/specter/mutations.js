class Mutations {
  constructor() {
    this.observers = [];
  }

  add(observer) {
    this.observers.push(observer);
  }

  remove(observer) {
    this.observers.splice(this.observers.indexOf(observer), 1)
  }

  dispatch() {
    this.observers.forEach(function(observer) {
      var records = observer.takeRecords();
      if (records && records.length > 0) {
        observer.callback(records);
      }
    });
  }
}

window.Specter.mutations = new Mutations();
