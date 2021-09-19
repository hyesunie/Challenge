// 1. 스켈레톤 코드는 어차피 실행안할 거긴 한데, 요롷게 js 로 만들어버리면 에러가나서, 다른 에디터에서 보기 힘들수 있기 때문에, 어느정도 문법을 지키던지,
// 다른 확장자로 만들던지 (ex, txt...)
// 2. ADT 명세와 같은 느낌으로 하는것도 괜찮다. (ex, stack)
// 대충 하기보다는, 쭈야는 좀 더 섬세하게 할수도 있다.
// 3. 뭔가 포맷이 궁금하다면? JsDoc 같은 것도 한번 참조


const { getEnabledCategories } = require("trace_events");




//입력을 받는 함수 (requestUserInput)
- 커맨드에서 입력만 받아오는 함수
- return 입력값

//입력을 함수로 매치시켜주는 함수? (router)
- 행동(show, add, update, delete) : return [todo배열, doing배열, done배열]  
- setTodo(id, todo, doing or done) : return [todo배열, doing배열, done배열]
    //리턴값을 이렇게 주는게 맞는지 getTodo를 호출하는게 맞는지 생각해보기
- deleteTodo(id) : return [삭제결과] 
    //리턴값을 이렇게 주는게 맞는지 getTodo를 호출하는게 맞는지 생각해보기

- getTag(tagName) : return [태그에 해당하는 id 목록]
- setTag(id, tagName) : return
- deleteTag(tagName) ; return [삭제결과]


//show 함수 (current, todo, todo-id, tag, tag-tagName )
- showData(State, dataArray) : return 없음
    -> 데이터에 따라 함수호출을 하고 반환 값으로 출력하는 함수
- showTodo
- showTag

//add 함수 (inputTodo,inputTodo-tagName)
- addData(State, inputTodo, tagArr)
    -> todo와 tag를 추가하는 함수

//update 함수 (id-doingOrdone, id-inputTodo)
- updateData(State, id, dataArr)
    -> id의 dataArr 값을 변경 하는 함수

//delete 함수(id)
- deleteData(id or tag)

//print 함수(데이터)
- printData(data)
