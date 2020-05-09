const Command = require("../../Base/Command");
const hbn = require("hastebin-gen");
const fs = require("fs");

class Source extends Command {
  constructor(client) {
    super(client, {
      name: "source",
      aliases: [],
      usage: ["source <command>"],
      description: ["Shows the source-code of a command."],
      permissions: ["Developer"]
    });
  }

  async execute(message, args, Discord) {
    if (this.client.config.admin.includes(message.author.id)) {
      let command = this.client.getCommand(args[0] || this.help.name);
      if (!command) return message.channel.send("Invalid command DUH!");
      let source = fs.readFileSync(command.location, `utf8`);
      if (source.length < 2037)
        return message.channel.send(
          "```js\n" +
            Discord.Util.escapeMarkdown(source, {
              codeBlockContent: true,
              codeblock: true
            }) +
            "```"
        );
      else {
        hbn(source, { extension: "coffeescript" })
          .then(haste => {
            return message.channel.send(
              new Discord.MessageEmbed().setDescription(
                `**[Click Here](${haste})**`
              )
            );
          })
          .catch(e => {
            return message.channel.send(
              "```js\n" +
                Discord.Util.escapeMarkdown(source, {
                  codeBlockContent: true,
                  codeblock: true
                }).substr(0, 2034) +
                "..." +
                "```"
            );
          });
      }
    } else return message.reply("nope...");
  }
}

module.exports = Source;
