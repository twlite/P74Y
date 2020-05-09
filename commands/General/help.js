const Command = require("../../Base/Command");

class Help extends Command {
  constructor(client) {
    super(client, {
      name: "help",
      description: "Displays bot commands.",
      aliases: ["h", "commands"],
      usage: ["help"],
      permissions: []
    });
  }

  async execute(message, args, Discord) {
    if (!args[0]) {
      const embed = new Discord.MessageEmbed()
        .setAuthor(`Total Commands: ${this.client.commands.size}`)
        .setTitle(`Commands`)
        .setThumbnail(this.client.user.displayAvatarURL({ format: "png" }))
        .setDescription(
          `Use **${this.client.prefix}help <command>** for more info.`
        )
        .addField(
          `Fun [${
            this.client.commands.filter(c => c.help.category === "Fun").size
          }]`,
          this.client.commands
            .filter(c => c.help.category === "Fun")
            .map(m => `\`${m.help.name}\``)
            .join(", ")
        )
        .addField(
          `General [${
            this.client.commands.filter(c => c.help.category === "General").size
          }]`,
          this.client.commands
            .filter(c => c.help.category === "General")
            .map(m => `\`${m.help.name}\``)
            .join(", ")
        )
        .addField(
          `Management [${
            this.client.commands.filter(c => c.help.category === "Management")
              .size
          }]`,
          this.client.commands
            .filter(c => c.help.category === "Management")
            .map(m => `\`${m.help.name}\``)
            .join(", ")
        )
        .addField(
          `Music [${
            this.client.commands.filter(c => c.help.category === "Music").size
          }]`,
          this.client.commands
            .filter(c => c.help.category === "Music")
            .map(m => `\`${m.help.name}\``)
            .join(", ")
        )
        // .addField(
        //   `Source Code`,
        //   `**[Click Here](https://github.com/INEX07/pikabot)**`
        // )
        .setColor("#FFFF00");
      return message.channel.send(embed);
    } else {
      let cmd = this.client.getCommand(args[0]);
      if (!cmd) return message.channel.send("❌ | Invalid Command.");
      const embed = new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTitle(cmd.help.name)
        .setThumbnail(this.client.user.displayAvatarURL({ format: "png" }))
        .setDescription(cmd.help.description)
        .addField("Category", cmd.help.category)
        .addField(
          "Aliases",
          cmd.help.aliases.length > 0 ? cmd.help.aliases.join(" ") : "None"
        )
        .addField(
          "Usage",
          `${
            cmd.help.usage[0].startsWith("No")
              ? cmd.help.usage[0]
              : cmd.help.usage.map(m => `${this.client.prefix}${m}`).join("\n")
          }`
        )
        .addField(
          "Permissions",
          cmd.help.permissions.length > 0
            ? cmd.help.permissions.join(", ")
            : "None"
        )
        .setColor("#FFFF00")
        .setFooter(
          `${this.client.user.username} - Commands`,
          this.client.user.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp();
      return message.channel.send(embed);
    }
  }
}

module.exports = Help;
