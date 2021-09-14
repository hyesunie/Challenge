//thisArg 뭔지 모르겠음!!!

Array.prototype.customFilter = function customFilter(callback, thisArg = null) {
  try {
    if (typeof callback !== "function")
      throw new TypeError(`${callback} is not function`);

    const result = [];

    for (let i = 0; i < this.length; i++) {
      const isTrue = callback.call(thisArg, this[i], i, this);
      if (isTrue) result.push(this[i]);
    }

    return result;
  } catch (e) {
    console.log(e);
  }
};

module.exports.customFilter = this.customFilter;
