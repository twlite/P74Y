const Command = require("../../Base/Command");

class Volume extends Command {
  constructor(client) {
    super(client, {
      name: "volume",
      description: "Set the player volume.",
      aliases: ["vol"],
      usage: ["volume", "volume <amount>"]
    });
  }

  async execute(message, args, Discord) {
    let queue = this.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("❌ | I'm not playing anything?");
    if (!message.member.voice.channel)
      return message.channel.send(`❌ | You're not in a voice channel!`);
    if (
      queue &&
      message.guild.me.voice.channel.id !== message.member.voice.channel.id
    )
      return message.channel.send(`❌ | You're not in my voice channel!`);
    if (!args[0])
      return message.channel.send(`Current volume is ${queue.volume * 20}`);
    if (isNaN(args[0]))
      return message.channel.send(`:x: | Please provide a valid amount.`);
    if (args[0] < 1)
      return message.channel.send(":x: | You can't set volume below 1.");
    if (args[0] > 100)
      return message.channel.send(":x: | You can't set volume over 100.");
    queue.volume = args[0] / 20;
    queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);
    return message.channel.send(`✅ | Volume set to ${args[0]}.`);
  }
}

module.exports = Volume;
