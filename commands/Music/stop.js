const Command = require("../../Base/Command");

class Skip extends Command {
  constructor(client) {
    super(client, {
      name: "stop",
      description: "Stop the player.",
      aliases: ["stop", "dc", "leave", "fuckoff"],
      usage: ["stop"]
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
    queue.songs = [];
    queue.connection.dispatcher.end();
    return message.channel.send("✅ | Alright, ending the player!");
  }
}

module.exports = Skip;
