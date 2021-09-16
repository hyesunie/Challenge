Array.prototype.customReduce = function customReduce(
  callback,
  initialValue = null
) {
  if (typeof callback !== "function")
    throw new TypeError(`${callback} is not function`);
  // throw new Error(`${callback} is not function`);

  // const hasInitValue =initialValue === null;

  let currentIndex = initialValue === null ? 1 : 0;
  // let currentIndex = hasInitValue ? 1 : 0;
  let accumulator = initialValue === null ? this[0] : initialValue;
  // let accumulator = hasInitValue ? this[0] : initialValue;

  for (; currentIndex < this.length; currentIndex++) {
    let currentValue = this[currentIndex];
    // const currentValue = this[currentIndex];
    accumulator = callback(accumulator, currentValue, currentIndex, this);
  }
  return accumulator;
};

module.exports.customReduce = this.customReduce;
