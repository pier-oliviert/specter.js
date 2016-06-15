function addEventListener(type, listener, options) {
  Specter.events.add(this, type, listener)
};
addEventListener.native = EventTarget.prototype.addEventListener;
EventTarget.prototype.addEventListener = addEventListener;


function removeEventListener(type, listener) {
  Specter.events.remove(this, type, listener);
}
removeEventListener.native = EventTarget.prototype.removeEventListener;;
EventTarget.prototype.removeEventListener = removeEventListener;


function dispatchEvent(event) {
  Specter.events.queue(this, event);
}

dispatchEvent.native = EventTarget.prototype.dispatchEvent;
EventTarget.prototype.dispatchEvent = dispatchEvent;
