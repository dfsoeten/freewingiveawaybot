const BaseCommand = require('./BaseCommand'),
      config = require('../../config');

class UpdateleaderboardsCommand extends BaseCommand{

    /**
     * Setup command
     */
    constructor(client, server){
        super(client);

        // Set command name & description
        this.name = 'Updateleaderboards';
        this.description = 'Manually updates the leaderboards';

        this.embed
            .setTitle('Leaderboards updated!')
            .setDescription('Leaderboards are updated, please give it a few minutes to fully refresh :)');

        this.server = server;
    }

    /**
     * Get Output
     *
     * @returns {string}
     */
    getOutput(){
        config.silent || console.log('-- Refresh Initiated --');
        this.server.initializeMembers();

        return this.embed;
    }
}

module.exports = UpdateleaderboardsCommand;