export default class Event {
  #events = {};

  on (event, fn) {
    if (!this.#events.hasOwnProperty(event)) {
      this.#events[event] = [];
    }
    this.#events[event].push(fn);
  }

  emit (event, data) {
    this.#events.hasOwnProperty(event) && this.#events[event].forEach(fn => fn(data));
  }

  off (event, fn) {
    if (this.#events.hasOwnProperty(event)) {
      const index = this.#events[event].indexOf(fn);
      index > -1 && this.#events[event].splice(index, 1);
    }
  }
}
