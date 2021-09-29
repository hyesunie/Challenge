const Logger = require("./Logger");
const VmGitController = require("./vm-git-controller");
const VmGitModel = require("./vm-git-model");

function init() {
  const logger = new Logger();
  const vmGitModel = new VmGitModel(logger);
  const vmGitController = new VmGitController(vmGitModel);

  vmGitController.run();
}

init();
