const Command = require("../../Base/Command");

class Are extends Command {
  constructor(client) {
    super(client, {
      name: "are",
      aliases: [],
      usage: ["are <text>"],
      description: "You are {num}% ${something}.",
      permissions: []
    });
  }

  async execute(message, args, Discord) {
    let something = args.join(" ");
    if (!something) return message.channel.send("You are what?");
    return message.channel.send(
      `You are ${Math.floor(Math.random() * 100)}% ${something}`
    );
  }
}

module.exports = Are;
