const Command = require("../../Base/Command");

class Shuffle extends Command {
  constructor(client) {
    super(client, {
      name: "shuffle",
      description: "Shuffle the queue.",
      aliases: [],
      usage: ["shuffle"]
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
    if (queue.songs.length < 3)
      return message.channel.send("❌ | You can't shuffle less than 3 songs.");
    queue.songs = queue.songs.shuffle();
    return message.channel.send("✅ | Queue shuffled!");
  }
}

module.exports = Shuffle;
