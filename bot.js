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

//Order66
const starwars = require('starwars');

//Initialize Client & Get Leaderboard
client.on('ready', () => {
  guild = client.guilds.get('467356820843790347');

  //Display Welcome Message
  console.log(`Bot initialized as ${client.user.tag}!`);
  //Set Activity
  client.user.setActivity(`Try ${config.commandprefix}help`);

  getRatings();
});

client.on('message', message => {
  var response;

  //Send Message
  switch (message.content){
      //Help
      case `${config.commandprefix}help`:
        response = '__**🔥 The Commands: 🔥**__ \n';
        response += `${config.commandprefix}help - Shows this message \n`;
        response += `${config.commandprefix}leaderboards - Updates, then shows the current leaderboard \n`;
        response += `${config.commandprefix}update-leaderboards - Updates the leaderboard manually \n`;
        response += `${config.commandprefix}get-profile - Gets your playoverwatch profile \n`;
        response += `${config.commandprefix}executeorder66 - Gets a random starwars quoute 🤷🏻‍ \n`;
      break;
      //Show Leaderboard
      case `${config.commandprefix}leaderboards`:
        getRatings();

        var rank = 1;
        response = '__**🏆 Leaderboard: 🏆**__ \n';

        for(let [player, sr] of ratings){
          response += '*#' + rank++ + '*   ' + player + '   ' + sr + 'SR \n';
        }
      break;
      //Update Leaderboards
      case `${config.commandprefix}update-leaderboards`:
        getRatings();
        response = '*🔄 Leaderboard updated! 🔄*';
      break;
      //Get profile
      case `${config.commandprefix}get-profile`:
        if(isValidUser(message.member.nickname))
          response = '**👤 Your profile: 👤** *https://playoverwatch.com/en-us/career/pc/' + message.member.nickname.replace('#', '-') + '*';
      break;
      //Order66
      case `${config.commandprefix}executeorder66`:
        response = '⭐️ *' + starwars() + '* ⭐️';
      break;
  }

  //Send Response
  if(response){
    message.channel.send(response);

    if(config.output)
      console.log(response);
  }
});

//Send welcome message
client.on('guildMemberAdd', (member) => {
  //Read the rules new user!
  client.channels.get('471714196955070465').send(`<@${member.user.id}> ༼ つ ◕ ◕ ༽つ READ RULES ༼ つ ◕ ◕ ༽つ`)
    .catch(config.debug && console.error);

  //Assign new free win helper role
  member.addRole('467357794870231043')
    .catch(config.debug && console.error);
});

//Try to catch the error
client.on('error', error => {
  config.debug && console.log('\x1b[31m', 'Lost connection!', '\x1b[0m')
});

//Foreach valid member get their SR
function getRatings(){
  client.guilds.get('467356820843790347').members.forEach(function(member){
    if(isValidUser(member.nickname)){
      //Get player data
      overwatch.getOverall('pc', 'eu', member.nickname.replace('#', '-'))
            .then((data) => {
              if(!isNaN(data.profile.rank)){
                ratings.set(data.profile.nick, data.profile.rank)
                config.debug && console.log('\x1b[32m', `${member.nickname}'s profile found`, '\x1b[0m')
              }
            })
            .catch(err => config.debug && console.log('\x1b[31m', `${member.nickname}'s profile not found`, '\x1b[0m'));
    }
  })
}

//Checks if the user is valid
function isValidUser(user){
  return (user && /(.{1,12}#[0-9]{1,10})\w+/g.test(user))
}

client.login(auth.token);
