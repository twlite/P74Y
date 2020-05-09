const Command = require("../../Base/Command");

class Resume extends Command {
  constructor(client) {
    super(client, {
      name: "resume",
      description: "Resume the player.",
      aliases: [],
      usage: ["resume"]
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
    if (queue && !queue.playing) {
      queue.playing = true;
      queue.connection.dispatcher.resume();
      return message.channel.send("▶ Resumed!");
    }
    return message.channel.send(":x: | Pause a song to resume.");
  }
}

module.exports = Resume;
