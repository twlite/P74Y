module.exports = class {
    constructor(client) {
        this.client = client;
    }

    async run(debug) {
        if (!this.client.config.debug) return;
        else this.client.logger.log(`Debug event was sent by Discord.js: \n${debug}`, "debug");
    }
};