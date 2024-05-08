export default class View {
  constructor() {
    this.userNameDisplay = document.createElement('div');
    document.body.appendChild(this.userNameDisplay);
  }

  render(userName) {
    this.userNameDisplay.textContent = `User Name: ${userName}`;
  }
}
