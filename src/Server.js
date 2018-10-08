const User = require('./User'),
      config = require('../config.json'),
      Overwatch = require('overwatch-js');

class Server{

    /**
     * Initializes User objects & pulls data from API
     *
     * @param client
     */
    constructor(client){
        //Set Acitivity
        client.user.setActivity(`Try ${config.commandprefix}help`);

        //Create users array
        const users = [];



        //Define Sorted Ratings
        // const ratings = new Map();
        // ratings[Symbol.iterator] = function* () {
        //     yield* [...this.entries()].sort((a, b) => a[1] - b[1]);
        // };

        client.guilds.get('467356820843790347').members.forEach(function(member){
            let user = new User(member.nickname);

            if(user.hasBattletag()){
                console.log(user.getUrlName());
                //Get user overwatch data from API
                Overwatch.getOverall('pc', 'eu', user.getUrlName())
                    .then((data) => {
                        if (!isNaN(data.profile.rank)) {
                            user.setRank(data.profile.rank);
                            !config.silent && console.log('\x1b[32m', `${member.nickname}'s profile found`, '\x1b[0m');
                        }
                    })
                    .catch(e => config.debug && console.log('\x1b[31m', `${member.nickname}'s profile not found`, '\x1b[0m'));

                //Save user
                users.push(user);
            }
        });
    }
}

module.exports = Server;