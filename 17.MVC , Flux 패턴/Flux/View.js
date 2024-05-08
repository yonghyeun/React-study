import Actions from './Action.js';
import Store from './Store.js';

class ViewClass {
  constructor() {
    this.userNameDisplay = document.createElement('div');
    document.body.appendChild(this.userNameDisplay);

    Store.addChangeListener(this.render.bind(this));
  }

  render() {
    this.userNameDisplay.textContent = `User Name: ${Store.getUser()}`;
    this.addEventListener();
  }

  addEventListener() {
    document.addEventListener('click', () => {
      const newName = prompt('Enter new name:');
      if (newName) {
        Actions.changeName(newName);
      }
    });
  }
}

const View = new ViewClass();

export default View;
