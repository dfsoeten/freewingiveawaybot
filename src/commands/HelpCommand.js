const config = require('../../config');
const BaseCommand = require('./BaseCommand');

class HelpCommand extends BaseCommand{

    /**
     * Shows help for all commmands
     *
     * @param client
     * @param commands
     */
    constructor(client, commands){
        super(client);

        // Set command name & description
        this.name = 'Help';
        this.description = 'Shows help for all commands';

        // Set embed properties
        this.embed
            .setTitle(this.name)
            .setDescription(this.description);
        for(let command in commands)
            this.embed.addField(commands[command].name, commands[command].description);
    }

    /**
     * Returns Command Output
     *
     * @returns {Discord.RichEmbed|module:discord.js.RichEmbed|*}
     */
    getOutput(){
        return this.embed;
    }
}

module.exports = HelpCommand;