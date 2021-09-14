const customReduce = require("./2").customReduce;
const customFilter = require("./3").customFilter;
const customforEach = require("./4").customForEach;
const customMap = require("./5").cutomMap;

// const extractor = new (require("./Extractor"))();
// const loader = new (require("./Loader"))();

// async function main() {
//   const jsondata = loader.parse(await loader.load());
//   const ret1 = extractor.getMatchedType(jsondata, "kt");
//   const ret2 = extractor.getMatchedType(jsondata, "sk");

// // customReduce
// const arr = [1, 2, 3, 4, 5];
// console.log(
//   arr.customReduce((acc, cur) => {
//     return acc + cur;
//   })
// );

// var flattened = [
//   [0, 1],
//   [2, 3],
//   [4, 5],
// ].customReduce(function (accumulator, currentValue) {
//   return accumulator.concat(currentValue);
// }, []);
// console.log(flattened);
// 펼친 결과: [0, 1, 2, 3, 4, 5]

// var people = [
//   { name: "Alice", age: 21 },
//   { name: "Max", age: 20 },
//   { name: "Jane", age: 20 }
// ];

// function groupBy(objectArray, property) {
//   return objectArray.customReduce(function(acc, obj) {
//     var key = obj[property];
//     if (!acc[key]) {
//       acc[key] = [];
//     }
//     acc[key].push(obj);
//     return acc;
//   }, {});
// }
// var groupedPeople = groupBy(people, "age");
// console.log(groupedPeople);

// var names = ["Alice", "Bob", "Tiff", "Bruce", "Alice"];

// var countedNames = names.customReduce(function (allNames, name) {
//   if (name in allNames) {
//     allNames[name]++;
//   } else {
//     allNames[name] = 1;
//   }
//   return allNames;
// }, {});
// console.log(countedNames);
// // countedNames is:
// // { 'Alice': 2, 'Bob': 1, 'Tiff': 1, 'Bruce': 1 }

// var people = [
//   { name: "Alice", age: 21 },
//   { name: "Max", age: 20 },
//   { name: "Jane", age: 20 }
// ];

// function groupBy(objectArray, property) {
//   return objectArray.customReduce(function(acc, obj) {
//     var key = obj[property];
//     if (!acc[key]) {
//       acc[key] = [];
//     }
//     acc[key].push(obj);
//     return acc;
//   }, {});
// }

// var groupedPeople = groupBy(people, "age");
// // groupedPeople is:
// // {
// //   20: [
// //     { name: 'Max', age: 20 },
// //     { name: 'Jane', age: 20 }
// //   ],
// //   21: [{ name: 'Alice', age: 21 }]
// // }
// console.log(groupedPeople);

// friends - an array of objects
// where object field "books" - list of favorite books
// var friends = [
//   {
//     name: "Anna",
//     books: ["Bible", "Harry Potter"],
//     age: 21,
//   },
//   {
//     name: "Bob",
//     books: ["War and peace", "Romeo and Juliet"],
//     age: 26,
//   },
//   {
//     name: "Alice",
//     books: ["The Lord of the Rings", "The Shining"],
//     age: 18,
//   },
// ];

// // allbooks - list which will contain all friends' books +
// // additional list contained in initialValue
// var allbooks = friends.customReduce(
//   function (accumulator, currentValue) {
//     return [...accumulator, ...currentValue.books];
//   },
//   ["Alphabet"]
// );
// console.log(allbooks);
// allbooks = [
//   'Alphabet', 'Bible', 'Harry Potter', 'War and peace',
//   'Romeo and Juliet', 'The Lord of the Rings',
//   'The Shining'
// ]

// let arr2 = [1, 2, 1, 2, 3, 5, 4, 5, 3, 4, 4, 4, 4];
// let result = arr2.sort().customReduce((accumulator, current) => {
//   const length = accumulator.length;
//   if (length === 0 || accumulator[length - 1] !== current) {
//     accumulator.push(current);
//   }
//   return accumulator;
// }, []);
// console.log(result); //[1,2,3,4,5]

// /**
//  * Runs promises from array of functions that can return promises
//  * in chained manner
//  *
//  * @param {array} arr - promise arr
//  * @return {Object} promise object
//  */
// function runPromiseInSequence(arr, input) {
//   return arr.customReduce(
//     (promiseChain, currentFunction) => promiseChain.then(currentFunction),
//     Promise.resolve(input)
//   );
// }

// // promise function 1
// function p1(a) {
//   return new Promise((resolve, reject) => {
//     resolve(a * 5);
//   });
// }

// // promise function 2
// function p2(a) {
//   return new Promise((resolve, reject) => {
//     resolve(a * 2);
//   });
// }

// // function 3  - will be wrapped in a resolved promise by .then()
// function f3(a) {
//   return a * 3;
// }

// // promise function 4
// function p4(a) {
//   return new Promise((resolve, reject) => {
//     resolve(a * 4);
//   });
// }

// const promiseArr = [p1, p2, f3, p4];
// runPromiseInSequence(promiseArr, 10).then(console.log); // 1200

// if (!Array.prototype.mapUsingReduce) {
//   Array.prototype.mapUsingReduce = function(callback, thisArg) {
//     return this.customReduce(function(
//       mappedArray,
//       currentValue,
//       index,
//       array
//     ) {
//       mappedArray[index] = callback.call(thisArg, currentValue, index, array);
//       return mappedArray;
//     },
//     []);
//   };
// }

// console.log(
//   [1, 2, , 3].mapUsingReduce(
//     (currentValue, index, array) => currentValue + index + array.length
//   )
// ); // [5, 7, , 10]

////////////////////////////
////////////////////////////
// custom filter
// var words = ["spray", "limit", "elite", "exuberant", "destruction", "present"];

// const result = words.customFilter((word) => word.length > 6);

// console.log(result);
// // expected output: Array ["exuberant", "destruction", "present"]

// function isBigEnough(value) {
//   return value >= 10;
// }

// var filtered = [12, 5, 8, 130, 44].customFilter(isBigEnough);
// // filtered 는 [12, 130, 44]
// console.log(filtered);

// var arr = [
//   { id: 15 },
//   { id: -1 },
//   { id: 0 },
//   { id: 3 },
//   { id: 12.2 },
//   {},
//   { id: null },
//   { id: NaN },
//   { id: "undefined" },
// ];

// var invalidEntries = 0;

// function isNumber(obj) {
//   return obj !== undefined && typeof obj === "number" && !isNaN(obj);
// }

// function filterByID(item) {
//   if (isNumber(item.id) && item.id !== 0) {
//     return true;
//   }
//   invalidEntries++;
//   return false;
// }

// var arrByID = arr.customFilter(filterByID);

// console.log("Filtered Array\n", arrByID);
//   // Filtered Array
//   // [{ id: 15 }, { id: -1 }, { id: 3 }, { id: 12.2 }]

//   console.log("Number of Invalid Entries = ", invalidEntries);
//   // Number of Invalid Entries = 5

var fruits = ["apple", "banana", "grapes", "mango", "orange"];

/**
 * 검색 조건에 따른 배열 필터링(쿼리)
 */
function filterItems(query) {
  return fruits.customFilter(function (el) {
    return el.toLowerCase().indexOf(query.toLowerCase()) > -1;
  });
}

console.log(filterItems("ap")); // ['apple', 'grapes']
console.log(filterItems("an")); // ['banana', 'mango', 'orange']

//   const fruits2 = ["apple", "banana", "grapes", "mango", "orange"];

/**
 * 검색 조건에 따른 배열 필터링(쿼리)
 */
//   const filterItems2 = query => {
//     return fruits2.customFilter(
//       el => el.toLowerCase().indexOf(query.toLowerCase()) > -1
//     );
//   };

//   console.log(filterItems2("ap")); // ['apple', 'grapes']
//   console.log(filterItems2("an")); // ['banana', 'mango', 'orange']

// // custom forEach
// const items = ["item1", "item2", "item3"];
// const copy = [];

// // 이전
// for (let i = 0; i < items.length; i++) {
//   copy.push(items[i]);
// }

// // 이후
// items.customForEach(function(item) {
//   copy.push(item);
// });
// console.log(copy);

// function logArrayElements(element, index, array) {
//   console.log("a[" + index + "] = " + element);
// }

// // 인덱스 2는 배열의 그 위치에 항목이 없기에
// // 건너뜀을 주의하세요.
// [2, 5, , 9].customForEach(logArrayElements);
// // 기록:
// // a[0] = 2
// // a[1] = 5
// // a[3] = 9

// function Counter() {
//   this.sum = 0;
//   this.count = 0;
// }
// Counter.prototype.add = function(array) {
//   array.customForEach(function(entry) {
//     console.log("sum", this.sum);
//     this.sum += entry;
//     console.log("entry", entry);
//     console.log("sum", this.sum);
//     ++this.count;
//   }, this);
//   // ^---- 주의
//   console.log(this);
// };

// var obj5 = new Counter();
// obj5.add([2, 5, 9]);
// console.log(obj5.count);
// // 3
// console.log(obj5.sum);
// // 16

// function copy2(obj) {
//   var copy = Object.create(Object.getPrototypeOf(obj));
//   var propNames = Object.getOwnPropertyNames(obj);

//   propNames.customForEach(function(name) {
//     var desc = Object.getOwnPropertyDescriptor(obj, name);
//     Object.defineProperty(copy, name, desc);
//   });

//   return copy;
// }

// var obj1 = { a: 1, b: 2 };
// var obj2 = copy2(obj1); // obj2는 이제 obj1처럼 보임
// console.log(obj2);

// var words = ["one", "two", "three", "four"];
// words.customForEach(function(word) {
//   console.log(word);
//   if (word === "two") {
//     words.shift();
//   }
// });
// // one
// // two
// // four

// const a12 = [1, 2, 3, 4, 5];
// a12.customForEach(ele => {
//   console.log(ele + 2);
// });

// // custom map
// var numbers = [1, 4, 9];
// var roots = numbers.customMap(Math.sqrt);
// // roots는 [1, 2, 3]
// // numbers는 그대로 [1, 4, 9]
// console.log(numbers);
// console.log(roots);

// var kvArray = [
//   { key: 1, value: 10 },
//   { key: 2, value: 20 },
//   { key: 3, value: 30 }
// ];

// var reformattedArray = kvArray.customMap(function(obj) {
//   var rObj = {};
//   rObj[obj.key] = obj.value;
//   return rObj;
// });
// // reformattedArray는 [{1:10}, {2:20}, {3:30}]

// // kvArray는 그대로
// // [{key:1, value:10},
// //  {key:2, value:20},
// //  {key:3, value: 30}]
// console.log(reformattedArray);
// console.log(kvArray);

// var numbers = [1, 4, 9];
// var doubles = numbers.customMap(function(num) {
//   return num * 2;
// });
// // doubles는 이제 [2, 8, 18]
// // numbers는 그대로 [1, 4, 9]
// console.log(doubles);
// console.log(numbers);

// var map = Array.prototype.customMap;
// var a = map.call("Hello World", function(x) {
//   return x.charCodeAt(0);
// });
// // a는 이제 [72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100]
// console.log(a);

// // 아래 라인을 보시면...
// ["1", "2", "3"].map(parseInt);
// // 결과를 [1, 2, 3] 으로 기대할 수 있습니다.
// // 그러나 실제 결과는 [1, NaN, NaN] 입니다.

// // parseInt 함수는 보통 하나의 인자만 사용하지만, 두 개를 받을 수 있습니다.
// // 첫 번째 인자는 변환하고자 하는 표현이고 두 번째는 숫자로 변환할 때 사용할 진법입니다.
// // Array.prototype.map은 콜백에 세 가지 인자를 전달합니다.
// // 배열의 값, 값의 인덱스, 그리고 배열
// // 세 번째 인자는 parseInt가 무시하지만 두 번째 인자는 아닙니다.
// // 따라서 혼란스러운 결과를 도출할 수 있습니다. 자세한 내용은 블로그 포스트를 참고하시길 바랍니다.

// function returnInt(element) {
//   return parseInt(element, 10);
// }

// console.log(["1", "2", "3"].customMap(returnInt)); // [1, 2, 3]
// // 실제 결과가 예상한 대로 배열의 숫자와 같습니다.

// // 위와 같지만 더 간단한 화살표 표현식
// console.log(["1", "2", "3"].customMap(str => parseInt(str)));

// // 더 간단하게 해결할 수 있는 방법
// console.log(["1", "2", "3"].customMap(Number)); // [1, 2, 3]
// // 그러나 `parseInt`와 달리 float이나 지수표현도 반환합니다.
// console.log(["1.1", "2.2e2", "3e300"].customMap(Number)); // [1.1, 220, 3e+300]

// function Counter() {
//   this.sum = 0;
//   this.count = 0;
// }
// Counter.prototype.add = function(array) {
//   array.customForEach(function(entry) {
//     this.sum += entry;
//     ++this.count;
//   }, this);
//   // ^---- 주의
// };

// var obj = new Counter();
// obj.add([2, 5, 9]);
// console.log(obj.count);
// // 3
// console.log(obj.sum);
// // 16
// }

// main();
