
class User{

    /**
     * User
     *
     * @param name
     */
    constructor(name){
        this.name = name;
        if(this.name && /(.{1,12}#[0-9]{1,10})\w+/g.test(this.name))
            this.battletag = this.name;

    }

    /**
     * Get Name
     * @returns {*}
     */
    getName(){
        return this.name;
    }

    /**
     * Return url formatted Name
     *
     * @returns {void | string | *}
     */
    getUrlName(){
        return this.name.replace('#', '-');
    }

    /**
     * Checks if the user has a valid battletag
     * @returns {*|boolean}
     */
    hasBattletag(){
        if(this.battletag)
            return true;
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

module.exports = User;