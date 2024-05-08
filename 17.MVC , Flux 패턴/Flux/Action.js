import Dispatcher from './Dispatcher.js';

const Actions = {
  changeName(newName) {
    Dispatcher.dispatch({
      type: 'CHANGE_NAME',
      payload: newName,
    });
  },
};

export default Actions;
