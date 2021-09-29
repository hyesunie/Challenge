class VmGitModel {
  _local = [];
  _remote = [];

  // 형용사로 사용하기?
  STATE_NAME = {
    UNTRACK: "untracked",
    STAGE: "staged",
    UNMODIFY: "unmodified",
    MODIFY: "modified",
  };
  AREA_NAME = {
    WORK: "working directory",
    STAGE: "staging area",
    GIT: "git repository",
  };

  constructor(logger) {
    this.logger = logger;
  }

  createRepository(name) {
    const currentLocal = this._getLocal();
    const inputLocal = {
      repository: name,
      fileList: [],
      commitList: [],
    };

    const newLocal = [...currentLocal, inputLocal];

    this._setLocal(newLocal);
  }

  createFile(repositoryName, fileName) {
    const newLocal = this._getLocal().map((e) => {
      if (e.repository === repositoryName) {
        e.fileList.push({
          name: fileName,
          state: this.STATE_NAME.UNTRACK,
          area: this.AREA_NAME.WORK,
          time: new Date(),
        });
      }
      return e;
    });

    this._setLocal(newLocal);
  }

  createCommitLog(repositoryName, fileName, message) {
    const currentLocal = this._getLocal();
    const refoIdx = currentLocal.findIndex(
      (e) => e.repository === repositoryName
    );
    const commitTime = currentLocal[refoIdx].fileList.find(
      (e) => e.name === fileName
    ).time;

    const log = {
      name: fileName,
      message,
      time: commitTime,
    };

    currentLocal[refoIdx].commitList.push(log);

    this._setLocal(currentLocal);

    this.logger.printLogCommit(log);
  }

  modifyStateOfFile(repositoryName, fileName, changeState) {
    const currentLocal = this._getLocal();
    const repoIdx = currentLocal.findIndex(
      (e) => e.repository === repositoryName
    );

    currentLocal[repoIdx].fileList = currentLocal[repoIdx].fileList.map((e) => {
      if (e.name === fileName) {
        e.state = this.STATE_NAME[changeState];
      }
      return e;
    });

    this._setLocal(currentLocal);
  }

  modifyAreaOfFile(repositoryName, fileName, changeArea) {
    const currentLocal = this._getLocal();
    const repoIdx = currentLocal.findIndex(
      (e) => e.repository === repositoryName
    );

    currentLocal[repoIdx].fileList = currentLocal[repoIdx].fileList.map((e) => {
      if (e.name === fileName) {
        e.area = this.AREA_NAME[changeArea];
      }
      return e;
    });

    this._setLocal(currentLocal);
  }

  // update(id, newItem){
  //   const itemIdx = this._findByIndex(id);
  //
  //   this._local[itemIdx] = {...this._local[itemIdx],...newItem};
  // }
  //
  // _findByIndex(id){
  //   return this._local.findIndex(item=>item.id===id);
  // }

  modifyTimeOfFile(repositoryName, fileName) {
    const currentLocal = this._getLocal();
    const repoIdx = currentLocal.findIndex(
      (e) => e.repository === repositoryName
    );

    currentLocal[repoIdx].fileList = currentLocal[repoIdx].fileList.map((e) => {
      if (e.name === fileName) {
        e.time = new Date();
      }
      return e;
    });

    this._setLocal(currentLocal);
  }

  existRepositoryName(name) {
    const currentLocal = this._getLocal();
    return currentLocal.some((e) => e.repository === name);
    // false에 대한 출력을 여기서 로거를 사용해서 출력하는 것이 나은지?? 컨트롤러에서 출력하는게 나은지?
  }

  showLocalRepoArea(name) {
    if (name === "") {
      const repos = this._getLocal().map((e) => e.repository);
      this.logger.printNotRefoStatus(repos);
      return;
    }
    const currentRefo = this._getLocal().find((e) => e.repository === name);

    const working = currentRefo.fileList
      .map((e) => {
        if (e.area === this.AREA_NAME.WORK) return e;
      })
      .filter((e) => e !== undefined);
    const staging = currentRefo.fileList
      .map((e) => {
        if (e.area === this.AREA_NAME.STAGE) return e;
      })
      .filter((e) => e !== undefined);
    const git = currentRefo.fileList
      .map((e) => {
        if (e.area === this.AREA_NAME.GIT) return e;
      })
      .filter((e) => e !== undefined);

    //// logger 역할

    this.logger.printLogStatus(working, staging, git);

    // let printMsg =`---${this.AREA_NAME.WORK}/\n${}`;
  }

  showCommitLog(name) {
    const currentRefo = this._getLocal().find((e) => e.repository === name);
    this.logger.printCompleteCommit(currentRefo.commitList);
  }

  findFilesInStaged(name) {
    const currentRefo = this._getLocal().find((e) => e.repository === name);
    const matchedFiles = currentRefo.fileList
      .map((e) => {
        if (e.area === this.AREA_NAME.STAGE) {
          return e.name;
        }
      })
      .filter((e) => e !== undefined);

    return matchedFiles;
  }

  findFilesCompletedCommit(name) {
    const currentRefo = this._getLocal().find((e) => e.repository === name);
    return currentRefo.commitList.map((e) => e.name);
  }

  _getLocal() {
    return this._local;
  }

  _setLocal(inputLocal) {
    this._local = [...inputLocal];
  }
}

module.exports = VmGitModel;
