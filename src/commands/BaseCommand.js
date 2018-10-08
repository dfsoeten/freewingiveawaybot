const config = require('../../config');
const Discord = require('discord.js');

class BaseCommand{

    /**
     * Registers embed
     * @param client
     */
    constructor(client){

        //Initialize Embed
        this.embed = new Discord.RichEmbed();

        //Set Default Embed Properties
        this.embed
            .setTitle(this.name)
            .setAuthor(client.user.tag, client.user.avatarURL)
            .setColor(config.embed.color)
            .setFooter('I\'m made by DanIV#8981');
    }

}

module.exports = BaseCommand;