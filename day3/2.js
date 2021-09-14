Array.prototype.customReduce = function customReduce(
  callback,
  initialValue = null
) {
  try {
    if (typeof callback !== "function")
      throw new TypeError(`${callback} is not function`);
    let currentIndex = initialValue === null ? 1 : 0;
    let accumulator = initialValue === null ? this[0] : initialValue;

    for (; currentIndex < this.length; currentIndex++) {
      let currentValue = this[currentIndex];
      accumulator = callback(accumulator, currentValue, currentIndex, this);
    }
    return accumulator;
  } catch (e) {
    console.log(e);
  }
};

module.exports.customReduce = this.customReduce;
