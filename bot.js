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
  //Show The Leaderboard
  if(message.content === '!leaderboards'){
    var rank = 1;
    var result = '__**Leaderboard:**__ \n';

    for(let [player, sr] of ratings){
      result += '*#' + rank++ + '*   ' + player + '   ' + sr + 'SR \n';
    }

    message.channel.send(result);
  }

  //Update Leaderboards
  if(message.content === '!update-leaderboards'){
    getRatings();
    message.channel.send('Leaderboard updated!');
  }

  //Help
  if(message.content === '!help'){
    var result = '__** <-- It\'s Commands:**__ \n';
    result += '!help - Shows this message \n';
    result += '!leaderboards - Shows the current leaderboard \n';
    result += '!update-leaderboards - Refreshes the leaderboard \n';

    message.channel.send(result);
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
