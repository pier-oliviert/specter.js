class Events {
  constructor() {
    this.type = {};
    this.stack = [];
  }

  add(element, type, listener) {
    this.type[type] = this.type[type] || []
    this.type[type].push({node: element, callback: listener});
    element.addEventListener.native.bind(element)(type, Specter.events.queue.bind(Specter.events, element))
  }

  remove(element, type, listener) {
    var elements = this.type[type];
    (this.type[type] || []).filter(
      function(struct) {
        var match = struct.node == element;
        if (match && listener) {
          match = match && (listener == struct.callback);
        }
        return match;
      }
    ).forEach(
      function(struct) {
        elements.splice(elements.indexOf(struct), 1);
      }
    );
  }

  retrieve(type, source) {
    return (this.type[type] || []).filter(function(struct) {
      return struct.node == source
    });
  }

  queue(element, event) {
    if (event instanceof window.Specter.Event) {
      this.stack.push(event);
    } else {
      var e     = new Specter.Event();
      e.type    = event.type;
      e.native  = event;
      e.target  = element;
      this.stack.push(e);
    }
  }

  dispatch() {
    var events = this.stack.reverse();
    var event = events.pop();
    while (event) {
      Specter.events.retrieve(event.type, event.target).forEach(function(struct) {
        var element = struct.node;
        while(element && !event.stopped) {
          struct.callback(event);
          element = event.bubbles && element.parentElement;
        }
      })

      event = events.pop();
    }
  }

  any() {
    return this.stack.length > 0;
  }
}

window.Specter.events = new Events();

class Event {
  constructor(type) {
    this.type = type;
    this.prevent = false;
    this.stopped = false;
  }

  stopPropagation() {
    this.stopped = true;
  }

  preventDefault() {
    this.prevent = true;
  }

}

window.Specter.Event = Event;
