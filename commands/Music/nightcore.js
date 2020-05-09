const Command = require("../../Base/Command");

class Nightcore extends Command {
  constructor(client) {
    super(client, {
      name: "nightcore",
      description: "Creates nightcore audio effect.",
      aliases: ["ncore"],
      usage: ["nightcore"]
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
    queue.nightcore = !queue.nightcore;
    handle(message.guild, this.client, queue);
    return message.channel.send(
      queue.nightcore
        ? "Nightcore effect enabled!"
        : "Nightcore effect disabled!"
    );
  }
}

function handle(guild, client, queue) {
  return client.player.play(
    guild,
    queue.songs[0],
    queue.dispatcher.streamTime / 1.6
  );
}

module.exports = Nightcore;
