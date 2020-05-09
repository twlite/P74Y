const Command = require("../../Base/Command");
const fetch = require("node-fetch");
let sra = "https://cdn.discordapp.com/icons/486116455163625513/0dda586fd8dd4049c050f99872cd8d3b.png?size=1024";

class Lyrics extends Command {
  constructor(client) {
    super(client, {
      name: "lyrics",
      description: "Get song lyric.",
      aliases: ["ly"],
      usage: ["lyrics <song>"]
    });
  }

  async execute(message, args, Discord) {
    let title = args.join(" ");
    let queue = this.client.queue.get(message.guild.id);
    if (!title)
      return message.channel.send(
        "❌ | Oi, you've gotta provide search query."
      );
    else {
      let search = encodeURIComponent(title);
      fetch(`https://some-random-api.glitch.me/lyrics?title=${search}`)
        .then(res => res.json())
        .then(lyrics => {
          if (lyrics.error) return message.channel.send("❌ | Not found!");
          let embed = new Discord.MessageEmbed()
            .setTitle(lyrics.title + " - " + lyrics.author)
            .setThumbnail(lyrics.thumbnail.genius)
            .setDescription(
              lyrics.lyrics.length > 2048
                ? lyrics.lyrics.substring(0, 2045) + "..."
                : lyrics.lyrics
            )
            .setURL(lyrics.links.genius)
            .setColor("#FFFF00")
            .setFooter("some-random-api", sra)
            .setTimestamp();
          return message.channel.send(embed);
        });
    }
  }
}

module.exports = Lyrics;
