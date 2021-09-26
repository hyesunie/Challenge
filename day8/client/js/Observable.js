// export default class Observable {
//   constructor() {
//     this.observers = [];
//     console.log(this.observers);
//   }

//   subscribe(observer) {
//     // console.log(this.observers);
//   }

//   unsubscribe(observer) {
//     this.observers = this.observers.filter((el) => observer !== el);
//   }

//   notify(state) {
//     this.observers.forEach((observer) => observer(state));
//   }
//   getObservers() {
//     console.log("hell");
//   }
// }

function Observable() {
  this.observers = [];
  //   console.log("observable");
}

Observable.prototype = {
  subscribe: function (observer) {
    this.observers = [...this.observers, observer];
  },

  unsubscibe: function (observer) {
    this.observers = this.observers.filter((el) => observer !== el);
  },

  notify: function (msg) {
    this.observers.forEach((observer) => {
      observer(msg);
    });
  },
};

module.exports = Observable;
