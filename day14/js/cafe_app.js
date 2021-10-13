export default class CafeApp {
  worker = 0;
  orderMenu = {
    ame: 0,
    latte: 0,
    fra: 0,
  };
  _baristaContainer = document.querySelector(".barista-container");
  _baristaForm = this._baristaContainer.querySelector("form");
  _baristaMsg = this._baristaContainer.querySelector("p");
  _orderContainer = document.querySelector(".order-container");
  _orderForm = this._orderContainer.querySelector("form");

  constructor(cafeManager) {
    this.cafeManager = cafeManager;
  }
  init() {
    this._createFormEvent();
  }

  _createFormEvent() {
    this._baristaForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.worker = e.target[0].value;
      this._baristaMsg.innerHTML = `오늘 출근한 바리스타는 ${this.worker}명 입니다.`;
      e.target[0].value = "";
    });

    this._orderForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.orderMenu.ame = e.target[0].value;
      this.orderMenu.latte = e.target[1].value;
      this.orderMenu.fra = e.target[2].value;

      this.cafeManager.manageWork(this.worker, this.orderMenu);
      e.target[0].value = "";
      e.target[1].value = "";
      e.target[2].value = "";
    });
  }
}
// baristaForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   e.target[0].value;
//   baristaMsg.innerHTML = `오늘 출근한 바리스타는 ${e.target[0].value}명 입니다.`;
//   e.target[0].value = "";
// });

// orderForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   target[0].value
// });

// initOrder(ame, latte, fra){

// }
