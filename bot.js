//Setup Discord
const Discord = require('discord.js');
const client = new Discord.Client();

//Setup api
const overwatch = require('overwatch-js');

//Get Auth Key
const auth = require('./auth.json');

const ratings = new Map();
ratings[Symbol.iterator] = function* () {
    yield* [...this.entries()].sort((a, b) => a[1] - b[1]);
}

//Initialize Client & Get Leaderboard
client.on('ready', () => {
  var members = client.guilds.get('467356820843790347').members;

  //Display Welcome Message
  console.log(`Logged in as ${client.user.tag}!`);

  //Foreach valid member get their SR
  members.forEach(function(member){
    if(member.nickname && /(.{1,12}#[0-9]{1,10})\w+/g.test(member.nickname)){
      //Get player data
      overwatch.getOverall('pc', 'eu', member.nickname.replace('#', '-'))
            .then(data => ratings.set(data.profile.nick, data.profile.rank), console.log('\x1b[32m', member.nickname + '\'s profile found!', '\x1b[0m')) //console.log(data.profile.nick)
            .catch(err => console.log('\x1b[31m', member.nickname + '\'s profile not found', '\x1b[0m'));
    }
  })
});



client.login(auth.token);
