//Setup Discord
const Discord = require('discord.js');
const client = new Discord.Client();

//Setup api
const overwatch = require('overwatch-js');

//Get Auth Key
const auth = require('./auth.json');

//Define Sorted Ratings
const ratings = new Map();
ratings[Symbol.iterator] = function* () {
    yield* [...this.entries()].sort((a, b) => a[1] - b[1]);
}

//Initialize Client & Get Leaderboard
client.on('ready', () => {
  //Display Welcome Message
  console.log(`Bot initialized as ${client.user.tag}!`);

  getRatings();
});

client.on('message', message => {
  //Send Message
  switch (message.content) {
      case '!help':
        var response = '__** <-- It\'s Commands:**__ \n';
        response += '!help - Shows this message \n';
        response += '!leaderboards - Shows the current leaderboard \n';
        response += '!update-leaderboards - Refreshes the leaderboard \n';

        //Send Reply
        message.channel.send(response);
      break;
      case '!leaderboards':
        getRatings();

        var rank = 1;
        var response = '__**Leaderboard:**__ \n';

        for(let [player, sr] of ratings){
          response += '*#' + rank++ + '*   ' + player + '   ' + sr + 'SR \n';
        }

        //Send Reply
        message.channel.send(response);
      break;
      case '!update-leaderboards':
        getRatings();
        var response = 'Leaderboard updated!';

        //Send Reply
        message.channel.send(response);
      break;
  }
});

//Foreach valid member get their SR
function getRatings(){
  client.guilds.get('467356820843790347').members.forEach(function(member){
    if(member.nickname && /(.{1,12}#[0-9]{1,10})\w+/g.test(member.nickname)){
      //Get player data
      overwatch.getOverall('pc', 'eu', member.nickname.replace('#', '-'))
            .then(data => ratings.set(data.profile.nick, data.profile.rank), console.log('\x1b[32m', member.nickname + '\'s profile found!', '\x1b[0m')) //console.log(data.profile.nick)
            .catch(err => console.log('\x1b[31m', member.nickname + '\'s profile not found', '\x1b[0m'));
    }
  })
}

client.login(auth.token);
