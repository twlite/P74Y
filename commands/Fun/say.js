const Command = require("../../Base/Command");

class Say extends Command {
  constructor(client) {
    super(client, {
      name: "say",
      description: "Say something please.",
      aliases: ["copy"],
      usage: ["say <text>"],
      permissions: []
    });
  }

  async execute(message, args, Discord) {
    let msg = args.join(" ") || "What are you going to say?";
    return message.channel.send(
      new Discord.MessageEmbed()
        .setAuthor(
          message.author.tag,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(msg)
        .setColor(message.member.displayHexColor)
    );
  }
}

module.exports = Say;
