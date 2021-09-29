# vmgit
- entry point
- instance 생성 및 실행
````
init() {
    const logger = new Log()
    const vmGitModel = new VmGitModel(logger);
    const vmGitController = new VmGitController(vmGitModel)

    vmGitController.run();
 }
````

# controller
1. 사용자 명령어를 받아서 명령어 별로 행동을 지정해 줌
  - [x] init : 레파지토리 생성
  - [x] checkout : 레파지토리 변경, 지정 ** 이 값을 유지하고 있어야함 (컨트롤러 변수 필요함),
  - [x] new :file -> 저장소에 새 파일 추가(state: untracked, area: working dirctory)
  - [] status : checkout 변수로 레파지토리가 지정돼 있는 경우 -> 현재 저장소 area 별로 파일 목록과 파일의 변경 시간
     - [] 로컬일 경우와 리모트일 경우를 분리해야함
  - [x] add : 해당 파일의 상태: staged, area: staging area
  - [x] commit : staging area에 있는 모든 파일의 상태를 변경 => state: unmodified, area: git repository
  - [] touch : state: modified, area: working directory
  - [] log : 커밋로그와 함께 커밋한 파일과 시간을 출력
  - [] push : remote로 복사 (local의 레파지토리 내용)

2. 멤버변수
  - currentRepository : 현재 레파지토리를 갖고 있어야 함!! 초기값은 null 
  - vmGitSelector : 상태를 변경하거나 값을 받아 오기 위해서 있어야 함!! 초기값은 매개변수로 받아온 인스턴스 slice


# model
1. 모델의 멤버변수를 가공해서 컨트롤러에 넘기고, 컨트롤러에서 원하는 데이터를 멤버변수에 추가하도록
  - [] `createFile` 함수 레포 네임 없을 경우 생각하고 구현하기
  - [] `existRepositoryName` 레포 이름이 없는 경우 로거로 출력하기
  - [] 

2. 멤버변수
  - local = [{repository, fileList(state, area, mTime), commitList}]
  - remote : 커밋한 로컬 내용 복사

# unit


# logger
1. 프린트 함수 모음!!
   