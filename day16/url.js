class URL {
  constructor(input) {
    this.input = input;
    this.createUrlObject(input);
  }

  createUrlObject(input) {
    this.absoluteString = input;
    input = input.replace(/^\</, "").replace(/\>$/, "");

    input = this.createScheme(input);
    input = this.createUserInfo(input);
    input = this.createHostAndPort(input);
    this.createPath(input);
  }

  createScheme(input) {
    const splitScheme = input.split("://");
    this.scheme = splitScheme[0];

    this.isFileUrl = this.scheme === "file" ? true : false;

    return splitScheme[1];
  }

  createUserInfo(input) {
    const splitUserInfo = input.split("@");
    const [user, password] =
      splitUserInfo.length === 1 ? ["", ""] : splitUserInfo.shift().split(":");
    this.user = user;
    this.password = password === undefined ? "" : password;

    return splitUserInfo[0];
  }

  createHostAndPort(input) {
    const splitSlash = input.split("/");
    const [host, port] = splitSlash.shift().split(":");
    this.host = host;
    this.port = port === undefined ? "" : port;

    return splitSlash.join("/");
  }

  createPath(input) {
    const existQuery = input.includes("?") ? true : false;
    const [path, query] = existQuery ? input.split("?") : [input, ""];

    const pathComponents = path.split("/");
    pathComponents.unshift("/");
    const lastPathComponent = pathComponents[pathComponents.length - 1];

    this.path = path;
    this.pathComponents = pathComponents;
    this.lastPathComponent = lastPathComponent;
    this.query = query;
  }

  appendPathComponent(inputPath) {
    console.log(this.absoluteString, this.pathComponents);

    const copyPathCom = [...this.pathComponents];
    const flag = copyPathCom.shift();
    const path = copyPathCom.join(flag);

    const reg = new RegExp(`${path}`);
    const completionPath = [path, inputPath].join(flag);
    this.absoluteString = this.absoluteString.replace(reg, completionPath);
    this.pathComponents.push(inputPath);
  }

  isEqual(compareUrl) {
    const equalScheme = this.scheme === compareUrl.scheme;
    const equalUser = this.user === compareUrl.user;
    const equalPassword = this.password === compareUrl.password;
    const equalHost = this.host === compareUrl.host;
    const equalPort = this.port === compareUrl.port;
    const equalPath = this.path === compareUrl.path;
    const equalQuery = this.query === compareUrl.query;
    const equalAbsolute = this.absoluteString === compareUrl.absoluteString;

    const state1 =
      equalScheme && equalUser && equalPassword && equalHost && equalPort;
    const state2 = equalScheme && equalHost && equalPort;
    const state3 =
      equalScheme &&
      equalUser &&
      equalPassword &&
      equalHost &&
      equalPort &&
      equalPath;

    if (equalAbsolute) {
      return 4;
    } else if (state3) {
      return 3;
    } else if (state1) {
      return 1;
    } else if (state2) {
      return 2;
    } else {
      return 5;
    }
  }
}

module.exports = URL;
