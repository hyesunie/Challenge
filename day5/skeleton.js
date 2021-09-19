const { getEnabledCategories } = require("trace_events")

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