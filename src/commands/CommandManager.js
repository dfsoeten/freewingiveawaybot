const config = require('../../config.json'),
      HelpCommand = require('./HelpCommand'),
      LeaderboardsCommand = require('./LeaderboardsCommand'),
      StarwarsCommand = require('./StarwarsCommand'),
      GetprofileCommand = require('./GetprofileCommand'),
      Updateleaderboards = require('./UpdateleaderboardsCommand');

class CommandManager{

    /**
     * Registers all available commands
     * @param message
     * @param client
     * @param server
     */
    constructor(message, client, server){
        this.commands = {};

        this.commands[`${config.commandprefix}leaderboards`] = new LeaderboardsCommand(client, server);
        this.commands[`${config.commandprefix}starwars`] = new StarwarsCommand(client);
        this.commands[`${config.commandprefix}getprofile`] = new GetprofileCommand(client, message);
        this.commands[`${config.commandprefix}updateleaderboards`] = new Updateleaderboards(client, server);
        this.commands[`${config.commandprefix}help`] = new HelpCommand(client, this.commands)
    }

    /**
     * Execute commands and returns the output
     *
     * @param text
     * @returns {Discord.RichEmbed|module:discord.js.RichEmbed|*}
     */
    execute(text){
        if(text in this.commands)
            return this.commands[text].getOutput();
    }
}

module.exports = CommandManager;