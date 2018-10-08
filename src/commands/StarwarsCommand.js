const BaseCommand = require('./BaseCommand'),
      starwars = require('starwars');

class StarwarsCommand extends BaseCommand{

    /**
     * Setup command
     */
    constructor(client){
        super(client);

        // Set command name & description
        this.name = 'Starwars';
        this.description = 'Get a random starwars qoute';
    }

    /**
     * Get Output
     *
     * @returns {string}
     */
    getOutput(){
        return '⭐️ *' + starwars() + '* ⭐️';
    }
}

module.exports = StarwarsCommand;