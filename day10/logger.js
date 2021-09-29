class Logger {
  _log = [];
  constructor() {}

  printLogStatus(working, staging, git) {
    const workingLog = working.reduce((acc, cur) => {
      acc += `${cur.name} ${cur.time}\n`;
      return acc;
    }, `---Working Directory/\n`);

    const stagingLog = staging.reduce((acc, cur) => {
      acc += `${cur.name} ${cur.time}\n`;
      return acc;
    }, `---Staging Area/\n`);

    const gitLog = git.reduce((acc, cur) => {
      acc += `${cur.name} ${cur.time}\n`;
      return acc;
    }, `---Git Repository/\n`);

    console.log(workingLog, stagingLog, gitLog);
  }

  printNotRefoStatus(repos) {
    const logMsg = repos.reduce((acc, cur) => {
      acc += `${cur}/\n`;
      return acc;
    }, "");

    console.log(logMsg);
  }

  printLogCommit({ name, _, time }) {
    const logMsg = `--commit files/\n${name} ${time}`;
    console.log(logMsg, "\n");
  }

  printCompleteCommit(commitList) {
    const logMsg = commitList.reduce((acc, cur) => {
      acc += `commit "${cur.message}"\n${cur.name} ${cur.time}`;
      return acc;
    }, "");

    console.log(logMsg);
  }

  // printLogAdd({})
}

module.exports = Logger;
