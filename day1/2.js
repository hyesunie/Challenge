function multipleGcd(arr) {
  function findGcd(a, b) {
    for (let i = Math.min(a, b); i > 0; i--) {
      if (a % i === 0 && b % i === 0) return i;
    }
  }

  let gcd = Math.max(...arr);

  while (arr.length > 0) {
    let num = arr.shift();
    gcd = findGcd(gcd, num);
  }
  return gcd;
}

let answer = multipleGcd([120, 60, 40, 20, 160]);
console.log(answer);
answer = multipleGcd([75, 125, 50, 30]);
console.log(answer);
