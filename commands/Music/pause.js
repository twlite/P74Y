const Command = require("../../Base/Command");

class Pause extends Command {
  constructor(client) {
    super(client, {
      name: "pause",
      description: "Pause the player.",
      aliases: [],
      usage: ["pause"]
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
      return message.channel.send(`❌ | You are not in my voice channel!`);
    if (queue && queue.playing) {
      queue.playing = false;
      queue.connection.dispatcher.pause();
      return message.channel.send("⏸ Paused!");
    }
    return message.channel.send(
      ":x: | I can't pause because I'm not playing anything rn."
    );
  }
}

module.exports = Pause;
