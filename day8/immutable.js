function mutable(obj) {
  obj.name = "mbboya";
}

function immutable(obj) {
  return { ...obj, name: "bboya" };
}

const obj = {
  name: "hyesune",
};

const immu = immutable(obj);

//immu != obj 같은 객체가 아니도록
//원본의 프로퍼티를 직접 접근하여 값을 변경하지 않도록!!
//원본을 변경하지 않고 함수에서 새로운 데이터로 가공 후 사용할 것
