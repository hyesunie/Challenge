function runSync(id) {
  const s = new Date().getSeconds();
  while (true) {
    if (new Date().getSeconds() - s >= 2) {
      console.log(`${id} sync 함수 실행`);
      break;
    }
  }
}

function runAsync(id) {
  console.log(id + " async 함수 실행");
}

function executeEventQueue(callStack, eventQueue) {
  setTimeout(() => {
    if (callStack.length > 0) executeCallStack(callStack);
    if (eventQueue.length > 0) callStack.push(eventQueue.shift());

    executeCallStack(callStack, eventQueue);
  }, 0);
}

function executeCallStack(callStack) {
  while (callStack.length > 0) {
    callStack.pop()();
  }
}

//callStack과 eventQueue의 갯수는 1개 이상 n개일 수 있다.
let callStack = [runSync.bind(null, 1), runSync.bind(null, 2)];
let eventQueue = [
  runAsync.bind(null, 1),
  runAsync.bind(null, 2),
  runAsync.bind(null, 3),
];

executeEventQueue(callStack, eventQueue);
executeCallStack(callStack);
callStack.push(runSync.bind(null, 3));

setTimeout(() => {
  callStack.push(runSync.bind(null, 4));
}, 6000);

setTimeout(() => callStack.push(runSync.bind(null, 5)), 20000);
