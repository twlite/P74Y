const Discord = require("discord.js");

module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run(message) {
        if (!message.guild || message.author.bot) return;
        if (!message.channel.permissionsFor(message.guild.me).missing("SEND_MESSAGES")) return;
        if (!message.channel.permissionsFor(this.client.user).has("SEND_MESSAGES")) return;
        const prefixes = this.client.db.fetch(`prefix_${message.guild.id}`) ? [this.client.db.fetch(`prefix_${message.guild.id}`), `<@${this.client.user.id}>`, `<@!${this.client.user.id}>`] : ['p?', 'P?', `<@${this.client.user.id}>`, `<@!${this.client.user.id}>`];
        let prefix = false;
        for (const thisPrefix of prefixes) {
            if (message.content.startsWith(thisPrefix)) prefix = thisPrefix;
        }
        if (!prefix) return;
        this.client.prefix = prefix;
        const args = message.content.slice(prefix.length).trim().split(" ");
        const command = args.shift().toLowerCase();
        if (message.guild && !message.member) await message.guild.fetchMember(message.author);
        const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));
        if (!cmd) return;
        if (cmd.help.category === "Developer" && !this.client.config.admin.includes(message.author.id)) return message.channel.send("nope...");
        const hook = new Discord.WebhookClient(this.client.config.logger.id, this.client.config.logger.token);
        const embed = new Discord.MessageEmbed()
            .setTitle("Command Used!")
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            .addField("Command", command)
            .addField("Content", message.content)
            .addField("Guild", message.guild.name)
            .setFooter(`@${this.client.user.username} - Logger`)
            .setTimestamp()
            .setColor("#7289DA")
        hook.send(embed);
        cmd.execute(message, args, Discord);
    }
}