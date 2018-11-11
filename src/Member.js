const config = require('../config.json'),
      Playoverwatch = require('./Playoverwatch');

class Member {

    /**
     * Member
     *
     * @param member
     */
    constructor(member){
        this.id = member.user.id;
        this.name = member.nickname;
        this.battletag = (this.name && /(.{1,12}#[0-9]{1,10})\w+/g.test(this.name)) ? this.name : null;
        this.hasBattletag() && (new Playoverwatch(this.getUrlName())).getRanking().then((rank) => { this.rank = rank });
    }

    /**
     * Get Name
     * @returns {*}
     */
    getName(){
        return this.name;
    }

    /**
     * Get URL formatted name
     * @returns {string}
     */
    getUrlName(){
        return this.name && this.name.replace('#', '-');
    }

    /**
     * Checks if the user has a valid battletag
     * @returns {*|boolean}
     */
    hasBattletag(){
        return !!(this.battletag);
    }

    /**
     * Set Rank
     *
     * @param rank
     */
    setRank(rank){
        this.rank = rank;
    }

    /**
     * Get Rank
     *
     * @returns {*}
     */
    getRank(){
        if(this.rank)
            return this.rank;
    }
}

module.exports = Member;