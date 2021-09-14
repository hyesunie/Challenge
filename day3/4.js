//js 배열의 원소가 undefiend 인 경우가 있다

Array.prototype.customForEach = function (callback, thisArg = null) {
  try {
    if (typeof callback !== "function")
      throw new TypeError(`${callback} is not function`);

    for (let i; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  } catch (e) {
    console.log(e);
  }
};
module.exports.customForEach = this.customForEach;
