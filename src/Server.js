const Member = require('./Member'),
      config = require('../config.json');

class Server {

    /**
     * Initializes User objects & pulls data from API
     *
     * @param client
     */
    constructor(client){
        //Define users dictionary
        this.client = client;
        this.users = {};

        //Initialize users dictionary
        for(let member of this.client.guilds.get('467356820843790347').members.array()){
            this.users[member] = new Member(member);
        }


        // this.client.guilds.get('467356820843790347').members.forEach(function(member){
        //     //console.log(member.user.id);
        //     this.memes[member.user.id] = new User(member)
        //     //this.users.push(new User(member.nickname));
        // });



        //Define Sorted Ratings
        // const ratings = new Map();
        // ratings[Symbol.iterator] = function* () {
        //     yield* [...this.entries()].sort((a, b) => a[1] - b[1]);
        // };
    }


    hasUser(name){
        return name in this.users;
    }

    findUser(name){
        if(this.hasUser(name))
            return this.users[name];
    }
}

module.exports = Server;