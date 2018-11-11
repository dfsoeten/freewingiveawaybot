const rp = require('request-promise'),
      config = require('../config.json'),
      $ = require('cheerio');

class Playoverwatch {

    constructor(urlName){
        this.overbuffUrl = `https://playoverwatch.com/en-us/career/pc/${urlName}`;
    }

    getRanking(){
        return rp(this.overbuffUrl)
            .then(function(html){
                let rank = $('.competitive-rank div', html).html();

                return rank ? rank : null;
            })
            .catch(function(err){
                //!config.silent && console.log(err);
            });
    }
}

module.exports = Playoverwatch;
