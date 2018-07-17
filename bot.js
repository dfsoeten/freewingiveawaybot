//Setup Discord
const Discord = require('discord.js');
const client = new Discord.Client();

//Setup api
const overwatch = require('overwatch-js');

//Get Auth Key
const auth = require('./auth.json');

//Get Bot Settings
const config = require('./config.json');

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
  var response;

  //Send Message
  switch (message.content){
      //Help
      case config.messageprefix + 'help':
        response = '__**🔥 The Commands: 🔥**__ \n';
        response += config.messageprefix + 'help - Shows this message \n';
        response += config.messageprefix + 'leaderboards - Updates, then shows the current leaderboard \n';
        response += config.messageprefix + 'update-leaderboards - Updates the leaderboard manually \n';
        response += config.messageprefix + 'get-profile - Gets your playoverwatch profile \n';
      break;
      //Show Leaderboard
      case config.messageprefix + 'leaderboards':
        getRatings();

        var rank = 1;
        response = '__**🏆 Leaderboard: 🏆**__ \n';

        for(let [player, sr] of ratings){
          response += '*#' + rank++ + '*   ' + player + '   ' + sr + 'SR \n';
        }
      break;
      //Update Leaderboards
      case config.messageprefix + 'update-leaderboards':
        getRatings();
        response = '*🔄 Leaderboard updated! 🔄*';
      break;
      //Get profile
      case config.messageprefix + 'get-profile':
        if(isValidUser(message.member.nickname))
          response = '**👤 Your profile: 👤** *https://playoverwatch.com/en-us/career/pc/' + message.member.nickname.replace('#', '-') + '*';
      break;
  }

  if(response)
    message.channel.send(response);
});

//Foreach valid member get their SR
function getRatings(){
  client.guilds.get('467356820843790347').members.forEach(function(member){
    if(isValidUser(member.nickname)){
      //Get player data
      overwatch.getOverall('pc', 'eu', member.nickname.replace('#', '-'))
            .then(data => ratings.set(data.profile.nick, data.profile.rank), config.debug && console.log('\x1b[32m', member.nickname + '\'s profile found!', '\x1b[0m'))
            .catch(err => config.debug && console.log('\x1b[31m', member.nickname + '\'s profile not found', '\x1b[0m'));
    }
  })
}

//Checks if the user is valid
function isValidUser(user){
  return (user && /(.{1,12}#[0-9]{1,10})\w+/g.test(user))
}

client.login(auth.token);
