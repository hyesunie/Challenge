//js 배열의 원소가 undefiend 인 경우가 있다

Array.prototype.customForEach = function (callback, thisArg = null) {
  if (typeof callback !== "function")
    throw new TypeError(`${callback} is not function`);

  for (let i = 0; i < this.length; i++) {
    // 빈 원소일 경우에 실행하면 안됨!!
    if (this[i] === undefined) continue;
    callback.call(thisArg, this[i], i, this);
  }
};

[1, ,].customForEach((e) => console.log(e));

module.exports.customForEach = this.customForEach;
