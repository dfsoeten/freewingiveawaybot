const Member = require('./Member'),
      config = require('../config.json'),
      sort = require('deep-sort');

class Server{

    /**
     * Initializes User objects & pulls data from API
     *
     * @param client
     */
    constructor(client){
        //Define members dictionary
        this.client = client;
        this.members = {};

        for(let member of this.client.guilds.get('467356820843790347').members.array()){
            let m = new Member(member);

            if(m.hasBattletag())
                m.initializeRank().then((r) => { if(r){ this.members[member.nickname] = m; config.silent || console.log(`Found rank(${r}) for ${m.getName()}`)} });
        }
    }

    /**
     * Checks if the server has a member
     *
     * @param name
     * @returns {boolean}
     */
    hasMember(name){
        return name in this.members;
    }

    /**
     * Finds member
     *
     * @param name
     * @returns {*}
     */
    findMember(name){
        if(this.hasMember(name))
            return this.members[name];
    }

    /**
     * Returns all members sorted by rank
     *
     * @returns {{}|*}
     */
    getMembers(){
        return sort.object(this.members, 'rank', 'desc');
    }
}

module.exports = Server;