const data = [1, 2, 3, 4];

function async(arr) {
  setTimeout(() => {
    while (true) {
      console.log(arr);
    }
  }, 2000);
}

async(data);

data.push(5);

setTimeout(() => {
  data.push(9);
}, 2000);
