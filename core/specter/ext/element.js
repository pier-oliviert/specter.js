var original = HTMLElement.prototype.click

HTMLElement.prototype.click = function() {
  var event = new window.Specter.Event();
  event.type = 'click'
  event.target = this;
  Specter.events.queue(this, event);
};
