const Command = require("../../Base/Command");

class Bold extends Command {
  constructor(client) {
    super(client, {
      name: "vaporwave",
      description: "Creates vaporwave audio effect.",
      aliases: ["lowpitch", "bold"],
      usage: ["vaporwave"]
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
    queue.vaporwave = !queue.vaporwave;
    handle(message.guild, this.client, queue);
    return message.channel.send(
      queue.pitchdown
        ? "Vaporwave effect enabled!"
        : "Vaporwave effect disabled!"
    );
  }
}

function handle(guild, client, queue) {
  return client.player.play(
    guild,
    queue.songs[0],
    queue.dispatcher.streamTime * 0.9
  );
}

module.exports = Bold;
