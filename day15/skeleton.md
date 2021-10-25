# main.js
### init()
```
function init() {
    const myEmitter = new EventEmitter();
    const cashier = new Cashier(myEmmitter);
    const order = new Order(myEmmitter);

    //바리스타 수에 대한 입력은 여기서 받기!!

    const dashboard = new dashboard(myEmitter);
    const manager = new Manager(myEmitter, order, dashboard)
    manager.setNumberOfBarista(입력받은 바리스타 수)

}
```

# Cashier
- [x] 음료주문을 연속으로 받아야함 
- [x] 음료주문이 들어왔을 때 주문정보를 만들고 order 객체로 내용을 방출 해야 함(이벤트 발생? 또는 직접 객체에 추가)
- [ ] 모든 음료를 만들고 나서 3초 동안 주문이 없으면 프로그램을 종료한다.(음료 완료를 캐셔가 알아야할까? 다른 객체가 해야할 일인지 생각해보기)
---
- emit eventName
  1. "addOrder"(->Order) : 입력 받은 order 값을 전달함
  2. 
```
class Cashier {
    constructor(myEmitter){
        this.myEmitter = myEmitter;
    }
    
    runCashier() {
        //커맨드라인 입력 창
        입력이 들어오면 => myEmitter.emit('order')
    }

    
}
```

# Order 
- [ ] 주문을 받을때 마다 orderList를 추가한다.
- [ ] 이벤트 없이 orderlist 추가되게 하도록 사용해도 되는 지?
---
- emit eventName
  1. "orderList"(->Manager) : 현재 OrderList를 전달함 (새로운 주문이 발생할때마다)

- add event listener
  1. "addOrder"(Cashier->) : 새로운 주문을 전달해 줌


```
class Order {
    orderList=[]
    constructor(myEmitter){
        this.myEmitter = myEmitter;
        this.myEmitter.on('order', ()=>{}//orderlist에 추가)
    }

    getOrderList(){
        return this.orderList 
    }

    setOrderList(newOrderList) {
        this.orderList = [...newOrderList];
    }
}
```

# Manager
- [ ] orderList를 1초에 한번씩 확인하고, 추가됐을 경우 해당 리스트를 받아옴(manager가 확인하는게 효율적일지? order이 1초마다 이벤트를 발생하는게 효율적일지 고민해봐야 함)
- [ ] 그리고 barista에게 일을 분배해서 줌(event emitter 사용)
- [ ] 일이 완료되면 dashboard를 업데이트 함
- [ ] 모든 업무 완료 후 3초가 입력이 없으면 프로그램을 종료함(모든 작업이 완료되면 그때부터 삼초를 카운트함)
----
- manager emit eventName

- add event listener
  1. "addOrder" (Cashier->) : 주문이 들어올 때 마다 업데이트 될때 마다 그 정보르 받음
  2. "setBarista" (Cashier->) : 바리스타 수 지정
```
class Manager {
    _orderMenu = []
    _barista = [];

    constructor(myEmitter, order, dashboard) {
        this.myEmitter = myEmitter;
        this.order = order
        this.dashboard = dashboard;
    }

    run(){
        setTimeOut(checkOrderList, 1000) //여러주문이 동시에 들어왔을 때 순차적으로 되는지 밀리는지 확인해야함
        this.myEmitter.on('completeMenu', 함수)
        // 필요한 에미터들 생성
    }

    setNumberOfBarista(num){
        this._prepareBarista(num)
    }

    _checkOrderList(){
        // 이 함수에서도 삼초 카운팅 필요할까?
        const orderList = order.getOrderList();
        if(orderList.length > 0) {
            this._manageOrderList(orderList.shift())
            order.setOrderList(orderList)
        }
    }

    _prepareBarista(num){
        for(let i=0; i<num; i++){
            const barista= new Barista(this.myEmitter, id);
            this.barista.push(barista);
        }
    }
    
    _manageOrderList(order) {
        this._createOrderMenu(order);
        this._
        
    }

    _createOrderMenu(order){
        //orderList 생성
    }
    
    
}
```

# Barista
- [ ] 한 번에 두가지 메뉴를 제작할 수 있음
- [ ] 음료를 만들기 시작할 때 이벤트를 발생시켜야 함
- [ ] 음료를 완성하고 이벤트를 발생시켜야 함(매니저한테)


# Dashboard 
- [ ] 커맨드 창에 현재 현황을 알려줌
- [ ] 현재 주문현황에 대한 정보를 객체로 가지고 있어야 함
- [ ] fetch를 이용해서 서버에 실시한 주문현황을 제공해야 함