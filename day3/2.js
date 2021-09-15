Array.prototype.customReduce = function customReduce(
  callback,
  initialValue = null
) {
  try {
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
  } catch (e) {
    console.log(e);
  }
};

// Array.prototype.customReduce = function(callback, initialValue) {
//   let acc = initialValue ? initialValue : this[0];
//   let i = initialValue ? 0 : 1;
//
//   for (i; i < this.length; i++) {
//     acc = callback(acc, this[i], i, this);
//   }
//   return acc;
// };


module.exports.customReduce = this.customReduce;
