const Command = require("../../Base/Command");

class Queue extends Command {
  constructor(client) {
    super(client, {
      name: "queue",
      description: "View current queue.",
      aliases: ["q"],
      usage: ["queue"]
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
    let songs = queue.songs;
    let songsa = songs
      .slice(0, 20)
      .map(
        m =>
          `${songs.indexOf(m) + 1}. ` +
          Discord.Util.escapeMarkdown(
            m.title.length > 30 ? m.title.substr(0, 30) + "..." : m.title
          )
      );
    const embed = new Discord.MessageEmbed()
      .setAuthor(`Queue`, message.guild.iconURL())
      .setDescription(songsa.join("\n"))
      .setFooter(`Showing ${songs.length}/${songsa.length} Songs`)
      .setColor("#FFFF00");
    return message.channel.send(embed);
  }
}

module.exports = Queue;
