const BaseCommand = require('./BaseCommand');

class LeaderboardsCommand extends BaseCommand{


    constructor(client){
        super(client);

        // Set command name & description
        this.name = 'Leaderboards';
        this.description = 'Shows a leaderboard with the lowest ranking members on this server';
    }
}

module.exports = LeaderboardsCommand;