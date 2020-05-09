const Command = require("../../Base/Command");

class Config extends Command {
  constructor(client) {
    super(client, {
      name: "config",
      description: "Bot Configuration.",
      aliases: ["conf", "botconfig", "botconf"],
      usage: ["config <prop> <value>"],
      permissions: ["MANAGE_GUILD"]
    });
  }

  async execute(message, args, Discord) {
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel.send(
        "❌ | You don't have `MANAGE_GUILD` permission to use this command."
      );
    let Case = args[0];
    switch (Case) {
      case "prefix":
        if (!args[1])
          return message.channel.send(
            `My prefix for this server is \`${this.client.prefix}\`.`
          );
        if (args[1].length > 10)
          return message.channel.send(
            "❌ | Prefix characters should be less than 10."
          );
        if (args[1] === "reset") {
          this.client.db.delete(`prefix_${message.guild.id}`);
          return message.channel.send(
            `✅ | Prefix for this server has been reset.`
          );
        }
        this.client.db.set(`prefix_${message.guild.id}`, args[1]);
        return message.channel.send(
          `✅ | Prefix for this server has been set to ${args[1]}.`
        );
        break;
      default:
        const embed = new Discord.MessageEmbed()
          .setAuthor(message.guild.name, message.guild.iconURL())
          .setTitle("Guild Configurations")
          .addField(
            "Prefix",
            this.client.db.fetch(`prefix_${message.guild.id}`)
              ? this.client.db.fetch(`prefix_${message.guild.id}`)
              : this.client.prefix
          )
          .setColor("#FFFF00")
          .setTimestamp()
          .setFooter(
            `Requested by: ${message.member.user.tag}`,
            message.member.user.displayAvatarURL({ dynamic: true })
          );
        return message.channel.send(embed);
    }
  }
}

module.exports = Config;
