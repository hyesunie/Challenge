//new Array 좋진 않음, new 지원버전도 있음

Array.prototype.customMap = function (callback, thisArg) {
  try {
    if (typeof callback !== "function")
      throw new TypeError(`${callback} is not function`);

    const result = [];

    for (let i; i < this.length; i++) {
      result.push(callback.call(thisArg, this[i], i, this));
    }

    return result;
  } catch (e) {
    console.log(e);
  }
};

//리듀스 -> 콜백에서 디스참조해서 장난쳐보기!! 포문의 종료조건이 바뀌기 떄문에 확인해보기
module.exports.cutomMap = this.cutomMap;
