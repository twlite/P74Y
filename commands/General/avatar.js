const Command = require("../../Base/Command");

class Avatar extends Command {
  constructor(client) {
    super(client, {
      name: "avatar",
      aliases: ["av", "pfp"],
      description: "Sends avatar of a user.",
      usage: ["avatar", "avatar <@user>"],
      permissions: []
    });
  }

  async execute(message, args, Discord) {
    let user =
      message.mentions.users.first() ||
      this.client.users.get(args[0]) ||
      message.author;
    return message.channel.send(
      new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTitle(`Avatar of ${user.tag}`)
        .setURL(user.displayAvatarURL({ dynamic: true, size: 1024 }))
        .setImage(user.displayAvatarURL({ dynamic: true, size: 1024 }))
        .setColor("#FFFF00")
        .setFooter(message.guild.name, message.guild.iconURL())
        .setTimestamp()
    );
  }
}

module.exports = Avatar;
