class Requests {
  constructor() {
    this.requests = [];
  }

  add(request) {
    this.requests.push(request);
  }

  remove(request) {
    this.requests.splice(this.requests.indexOf(request), 1)
  }

  dispatch() {
    this.requests.forEach(function(request) {
    });
  }
}

window.Specter.requests = new Requests();

