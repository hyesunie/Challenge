const readline = require("readline");

class VmGitController {
  _commandRouter = {
    init: (arg) => this._processInit(arg),
    checkout: (arg) => this._processCheckout(arg),
    new: (arg) => this._processNew(arg, this._currentRepository),
    status: (arg) => this._processStatus(arg),
    add: (arg) => this._processAdd(arg, this._currentRepository),
    commit: (arg) => this._processCommit(arg, this._currentRepository),
    touch: (arg) => this._processTouch(arg, this._currentRepository),
    log: (arg) => this._processLog(this._currentRepository),
    push: (arg) => this._processPush(arg),
  };

  constructor(vmGitModel) {
    this.vmGitModel = vmGitModel;
    this._currentRepository = "";
  }

  run() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    this._recieveCommandLine(rl);
  }

  _recieveCommandLine(rl) {
    rl.question(`${this._currentRepository}/> `, (commandLine) => {
      if (commandLine === "quit") {
        console.log("프로그램을 종료합니다.");
        return rl.close();
      }

      const args = commandLine.split(" ");
      const command = args.shift();

      this._commandRouter[command](args);

      this._recieveCommandLine(rl);
    });
  }

  _processInit([repositoryName]) {
    this.vmGitModel.createRepository(repositoryName);
  }

  _processCheckout([repositoryName]) {
    //모델이 아닌곳에서도 덮어 써야하는지?
    if (!repositoryName) {
      this._currentRepository = "";
      return;
    }

    if (this.vmGitModel.existRepositoryName(repositoryName)) {
      this._currentRepository = repositoryName;
    }
  }

  _processNew([fileName], repositoryName) {
    this.vmGitModel.createFile(repositoryName, fileName);
  }

  _processStatus([area = "local", repositoryName = this._currentRepository]) {
    this.vmGitModel.showLocalRepoArea(repositoryName);
  }

  _processAdd([fileName], repositoryName) {
    const state = "STAGE";
    const area = "STAGE";
    this.vmGitModel.modifyStateOfFile(repositoryName, fileName, state);
    this.vmGitModel.modifyAreaOfFile(repositoryName, fileName, area);
    this.vmGitModel.modifyTimeOfFile(repositoryName, fileName);
  }

  _processCommit(args, repositoryName) {
    const state = "UNMODIFY";
    const area = "GIT";
    const commitMsg = args.join(" ");
    const files = this.vmGitModel.findFilesInStaged(repositoryName);

    files.forEach((e) => {
      this.vmGitModel.modifyStateOfFile(repositoryName, e, state);
      this.vmGitModel.modifyAreaOfFile(repositoryName, e, area);
      this.vmGitModel.modifyTimeOfFile(repositoryName, e);
      this.vmGitModel.createCommitLog(repositoryName, e, commitMsg);
    });
  }

  _processTouch([fileName], repositoryName) {
    const files = this.vmGitModel.findFilesCompletedCommit(repositoryName);

    if (files.includes(fileName)) {
      const state = "MODIFY";
      const area = "WORK";

      this.vmGitModel.modifyStateOfFile(repositoryName, fileName, state);
      this.vmGitModel.modifyAreaOfFile(repositoryName, fileName, area);
      this.vmGitModel.modifyTimeOfFile(repositoryName, fileName);
    }
  }

  _processLog(repositoryName) {
    this.vmGitModel.showCommitLog(repositoryName);
  }
  _processPush(arg) {
    console.log("push", arg);
  }
}

module.exports = VmGitController;
