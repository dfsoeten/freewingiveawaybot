//Define Imports, Classes & Config
const Discord = require('discord.js'),
      client = new Discord.Client(),
      //Include Classes
      Message = require('./src/Message'),
      Server = require('./src/Server'),
      //Include auth token
      auth = require('./auth.json');

//Initialize Client
client.on('ready', () => {
  //Display Welcome Message
  console.log(`Bot initialized as ${client.user.tag}!`);

  const server = new Server(client);
});

//Handle Messages
client.on('message', message => {
    (new Message(message, client)).send()

    console.log(this.users);
});

//Handle new members
client.on('guildMemberAdd', (member) => {
  //Read the rules new user!
  client.channels.get('471714196955070465').send(`<@${member.user.id}> ༼ つ ◕ ◕ ༽つ READ RULES ༼ つ ◕ ◕ ༽つ`)
    .catch(config.debug && console.error);

  //Assign new free win helper role
  member.addRole('467357794870231043')
    .catch(config.debug && console.error);
});

//Handle errors
client.on('error', error => {

});

//Login
client.login(auth.token);
