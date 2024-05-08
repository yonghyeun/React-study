import Dispatcher from './Dispatcher.js';

class StoreClass {
  constructor() {
    this.user = { name: 'John Doe' };
    this.listeners = [];

    Dispatcher.register(this.handleActions.bind(this));
  }

  handleActions(action) {
    switch (action.type) {
      case 'CHANGE_NAME':
        this.user.name = action.payload;
        this.emitChange();
        break;
      default:
    }
  }

  addChangeListener(callback) {
    this.listeners.push(callback);
  }

  removeChangeListener(callback) {
    this.listeners = this.listeners.filter((listener) => listener !== callback);
  }

  emitChange() {
    this.listeners.forEach((listener) => listener());
  }

  getUser() {
    return this.user.name;
  }
}

const Store = new StoreClass();

export default Store;
