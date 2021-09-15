Array.prototype.customFilter = function customFilter(callback, thisArg = null) {
  // try-catch 사용 시 유의해야할 점.
  // 내가 작성한 코드가 남이 사용하는 코드라면~ 없는게 낫다.
  // 아니면 있더라면~ 최종 catch 에서 다시 에러를 던져라.
  // catch 에서는 에러를 가공한다는 정도만 하고, 정상동작을 만들어버리면 안된다.

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
    // console.error(e); 가 맞지만 여기서는 아님
  }
};

// try{
//   array.customFilter
// }catch(e){
//   // 에러 안남...
// }

Array.prototype.customFilter = function(callback, _this) {
  let ret = new Array();
  // let ret = []; 이걸 추천

  for (let i = 0; i < this.length; i++) {
    if (callback.call(_this, this[i], i, this)) ret.push(this[i]);
  }

  return ret;
};


module.exports.customFilter = this.customFilter;
