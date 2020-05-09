const path = require("path");

class Command {
  /**
   *
   * @param {Client} client Discord Client
   * @param {Object} param1 command conf
   */
  constructor(
    client,
    {
      name = null,
      description = "No description provided.",
      category = "Other",
      usage = ["No usage provided."],
      aliases = [],
      permissions = []
    }
  ) {
    this.client = client;
    this.help = { name, description, category, usage, aliases, permissions };
  }
}
module.exports = Command;
