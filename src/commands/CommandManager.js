const HelpCommand = require('./HelpCommand'),
      LeaderboardsCommand = require('./LeaderboardsCommand'),
      StarwarsCommand = require('./StarwarsCommand'),
      GetprofileCommand = require('./GetprofileCommand'),
      Updateleaderboards = require('./UpdateleaderboardsCommand');

class CommandManager{

    /**
     * Registers all available commands
     * @param client
     * @param server
     */
    constructor(client, server){
        this.commands = {
            //'leaderboards': new LeaderboardsCommand(client),
            'starwars': new StarwarsCommand(client),
            'getprofile': new GetprofileCommand(client, server),
            //'updateleaderboards': new Updateleaderboards(client)
        };

        this.commands['help'] = new HelpCommand(client, this.commands)
    }

    /**
     * Execute commands and returns the output
     *
     * @param text
     * @returns {Discord.RichEmbed|module:discord.js.RichEmbed|*}
     */
    execute(text){
        if(text in this.commands)
            return this.commands[text].getOutput()
    }
}

module.exports = CommandManager;