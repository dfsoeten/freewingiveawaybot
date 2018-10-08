const BaseCommand = require('./BaseCommand');

class UpdateleaderboardsCommand extends BaseCommand{

    /**
     * Setup command
     */
    constructor(client){
        super(client);

        // Set command name & description
        this.name = 'Updateleaderboards';
        this.description = 'Manually updates the leaderboards';
    }

    /**
     * Get Output
     *
     * @returns {string}
     */
    getOutput(){
        //@todo: update leaderboards here

        return '*🔄 Leaderboard updated! 🔄*';
    }
}

module.exports = UpdateleaderboardsCommand;