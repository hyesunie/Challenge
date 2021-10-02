# call stack
- 함수들을 호출하는 스크립트에서 해당 위치를 추적하는 인터프리터를 위한 메커니즘
- 함수 내에서 어떤 함수가 동작하는 지, 다음에 어떤 함수가 호출되어야 하는 지 등을 제어
- 메인함수 실행 => 스크립트를 읽으면서 나오는 함수 call stack에 push => push한 함수 읽으면서 나오는 함수 call stack에 push => 함수를 다 실행하면 call stack에서 빼고 이 함수가 호출된 라인으로 돌아가서 다시 실행 => 전체 코드가 모두 실행되면 call stack이 empty로 끝남
  
# event queue
- 웹 브라우저에서 이벤트 리스너가 부착된 이벤트가 발생할 때마다 메시지가 추가 됨
- setTimeout(대기열에 추가할 메시지, 시간)
  1. 시간 값은 메시지가 실제로 큐에 푸시 될 때까지의 최소 지연 시간
  2. 대기열에 다른 메시지가 없으면 지연 직후에 메시지 처리
  3. 다른 메시지가 있는 경우에는 **다른 메시지가 처리 될 때까지 기다려야함**
  4. 시간 매개변수는 최소 시간을 나타내지만 **보장된 시간이 아님**
 

# event loop
```
while(queue.waitForMessage()){
  queue.processNextMessage();
}
```


[https://medium.com/front-end-weekly/javascript-event-loop-explained-4cd26af121d4]
[https://medium.com/sjk5766/javascript-%EB%B9%84%EB%8F%99%EA%B8%B0-%ED%95%B5%EC%8B%AC-event-loop-%EC%A0%95%EB%A6%AC-422eb29231a8]