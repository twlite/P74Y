module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run() {
        this.client.user.setActivity(`p?help | ${this.client.guilds.size} Guilds | ${this.client.users.size} Users`, {
            type: "WATCHING"
        });
        this.client.logger.log(`${this.client.user.tag}, ready to serve ${this.client.users.size} users in ${this.client.guilds.size} servers.`, "ready");
    }
}