const BaseCommand = require('./BaseCommand');

class GetprofileCommand extends BaseCommand{

    /**
     * Setup command
     */
    constructor(client){
        super(client);

        // Set command name & description
        this.name = 'Getprofile';
        this.description = 'Get your playoverwatch profile';
    }

    /**
     * Get Output
     *
     * @returns {string}
     */
    getOutput(){
        return '**👤 Your profile: 👤** *https://playoverwatch.com/en-us/career/pc/' + message.member.nickname.replace('#', '-') + '*';
    }
}

module.exports = GetprofileCommand;