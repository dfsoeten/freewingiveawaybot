const BaseCommand = require('./BaseCommand'),
      config = require('../../config');

class LeaderboardsCommand extends BaseCommand{


    constructor(client, server){
        super(client);

        // Set command name & description
        this.name = 'Leaderboards';
        this.description = 'Shows a leaderboard with the lowest ranking users on this server';

        // Set embed properties
        if(Object.keys(server.getMembers()).length === 0)
            this.embed
                .setTitle(`I'm empty :(`)
                .setDescription(`Refresh me using ${config.commandprefix}update-leaderboards`);
        else
            this.embed
                .setTitle(this.name)
                .setDescription('Current leaderboard:');

        //Display server leaderboards
        Object.values(server.getMembers()).forEach((member, i = 0) => {
            this.embed.addField(`${i + 1}# ${member.name}`, `${member.rank}SR`);
        });
    }
}

module.exports = LeaderboardsCommand;