const config = require('../config');
const CommandManager  = require('./commands/CommandManager');

class Message{

    /**
     * Initialize Message
     *
     * @param message
     * @param client
     * @param server
     */
    constructor(message, client, server){
        this.message = message;
        this.client = client;
        this.server = server;
        this.text = message.content;
        this.response = (new CommandManager(this.client, this.server)).execute(this.text);

        console.log(this.server.getMembers());
    }

    /**
     * Send Message
     */
    send(){
        if(this.response)
            this.message.channel.send(this.response);
    }
}

module.exports = Message;
