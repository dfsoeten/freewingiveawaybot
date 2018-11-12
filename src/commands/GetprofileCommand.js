const BaseCommand = require('./BaseCommand'),
      Member = require('../Member');

class GetprofileCommand extends BaseCommand{

    /**
     * Setup command
     */
    constructor(client, message){
        super(client);

        // Set command name & description
        this.name = 'Getprofile';
        this.description = 'Get your playoverwatch profile';

        let member = new Member({'nickname': message.member.nickname, 'user': {'id': message.member.id}});

        // Set embed properties
        if(member.hasBattletag())
            this.embed
                .setTitle('Playoverwatch URL:')
                .setDescription(`*https://playoverwatch.com/en-us/career/pc/${member.getUrlName()}*`);
        else
            this.embed
                .setTitle('Oops :(')
                .setDescription('Your name could not be parsed, make sure you set your nickname to your battletag!');


    }
}

module.exports = GetprofileCommand;