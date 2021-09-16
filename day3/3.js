Array.prototype.customFilter = function customFilter(callback, thisArg = null) {
  // try-catch 사용 시 유의해야할 점.
  // 내가 작성한 코드가 남이 사용하는 코드라면~ 없는게 낫다.
  // 아니면 있더라면~ 최종 catch 에서 다시 에러를 던져라.
  // catch 에서는 에러를 가공한다는 정도만 하고, 정상동작을 만들어버리면 안된다.

  if (typeof callback !== "function")
    throw new TypeError(`${callback} is not function`);

  const result = [];

  for (let i = 0; i < this.length; i++) {
    const isTrue = callback.call(thisArg, this[i], i, this);
    if (isTrue) result.push(this[i]);
  }

  return result;
};

// try{
//   array.customFilter
// }catch(e){
//   // 에러 안남...
// }

module.exports.customFilter = this.customFilter;
