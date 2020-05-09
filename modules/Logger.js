const chalk = require("chalk");
const moment = require("moment");

class Logger {
  static log(content, type = "log") {
    const timestamp = `[${moment().format("YYYY-MM-DD HH:mm:ss")}]:`;
    switch (type) {
      case "log": {
        return console.log(
          chalk.bgBlue(`${timestamp} ${type.toUpperCase()} ${content} `)
        );
      }
      case "warn": {
        return console.log(
          chalk.bgYellow(`${timestamp} ${type.toUpperCase()} ${content} `)
        );
      }
      case "error": {
        return console.log(
          chalk.bgRed(`${timestamp} ${type.toUpperCase()} ${content} `)
        );
      }
      case "debug": {
        return console.log(
          chalk.green(`${timestamp} ${type.toUpperCase()} ${content} `)
        );
      }
      case "ready": {
        return console.log(
          chalk.black.bgGreen(`${timestamp} ${type.toUpperCase()} ${content}`)
        );
      }
      default:
        console.log(
          chalk.black.bgRed(
            "Logger type must be either warn, debug, log, ready, cmd or error."
          )
        );
    }
  }

  static error(content) {
    return this.log(content, "error");
  }

  static warn(content) {
    return this.log(content, "warn");
  }

  static debug(content) {
    return this.log(content, "debug");
  }

  static cmd(content) {
    return this.log(content, "cmd");
  }
}

module.exports = Logger;
