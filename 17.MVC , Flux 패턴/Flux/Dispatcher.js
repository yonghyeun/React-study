class DispatcherClass {
  constructor() {
    this.isDispatching = false;
    this.actionHandlers = [];
  }

  dispatch(action) {
    if (!this.isDispatching) {
      this.isDispatching = true;
      this.actionHandlers.forEach((handler) => handler(action));
      this.isDispatching = false;
    }
  }

  register(handler) {
    this.actionHandlers.push(handler);
  }
}

const Dispatcher = new DispatcherClass();

export default Dispatcher;
