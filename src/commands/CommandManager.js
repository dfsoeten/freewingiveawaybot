const HelpCommand = require('./HelpCommand');

class CommandManager{

    /**
     * Registers all available commands
     * @param client
     */
    constructor(client){
        this.commands = {
            'help': new HelpCommand(client, this.commands)
        }
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