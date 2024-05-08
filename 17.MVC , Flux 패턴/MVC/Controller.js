export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.render(this.model.getName()); // 초기 뷰 렌더링
    this.initEventListeners(); // 이벤트 리스너 설정
  }

  initEventListeners() {
    document.addEventListener('click', () => {
      const newName = prompt('Enter new name:');
      if (newName) {
        this.model.setName(newName);
        this.view.render(this.model.getName());
      }
    });
  }
}
