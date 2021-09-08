function gcd(arr) {
  let [a, b] = arr;

  for (let i = Math.min(a, b); i > 0; i--) {
    if (a % i === 0 && b % i === 0) return i;
  }
}

console.log(gcd([18, 45]));
console.log(gcd([11, 3]));
console.log(gcd([137, 2983]));
console.log(gcd([100, 200]));
