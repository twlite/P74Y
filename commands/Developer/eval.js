const Command = require("../../Base/Command");

class Eval extends Command {
  constructor(client) {
    super(client, {
      name: "eval",
      aliases: ["ev"],
      usage: ["eval <code>"],
      description: ["Evaluates arbitrary Javascript."],
      permissions: ["Developer"]
    });
  }

  async execute(message, args, Discord) {
    let checkAdmin = this.client.config.admin.includes(message.author.id);
    if (!checkAdmin) return message.reply("nope?");
    const code = args.join(" ");
    if (!code) return message.channel.send("❌ | Please provide code to eval.");
    try {
      const evalCode = eval(code);
      const evaled = await this.client.cleanText(evalCode);
      const embed = new Discord.MessageEmbed()
        .setAuthor("EVALUATION", message.author.displayAvatarURL)
        .setColor(123456)
        .setTitle(`📥INPUT📥`)
        .setDescription(`\`\`\`js\n${code}\`\`\``)
        .addField(
          `📤OUTPUT📤`,
          `\`\`\`js\n${this.client.cleanText(evaled)}\`\`\``,
          false
        )
        .addField(`📄TYPE📄`, `\`\`\`js\n${typeof evalCode}\`\`\``, false)
        .setFooter("OUTCOME: SUCCESS!", this.client.user.displayAvatarURL)
        .setTimestamp();
      return message.channel.send(embed);
    } catch (err) {
      const embed = new Discord.MessageEmbed()
        .setAuthor("EVALUATION", message.author.displayAvatarURL)
        .setColor("#FF0000")
        .setTitle(`📥INPUT📥`)
        .setDescription(`\`\`\`js\n${code}\`\`\``)
        .addField(`📤OUTPUT📤`, `\`\`\`js\n${this.client.cleanText(err)}\`\`\``)
        .setFooter("OUTCOME: ERROR!", this.client.user.displayAvatarURL)
        .setTimestamp();
      return message.channel.send(embed);
    }
  }
}

module.exports = Eval;
