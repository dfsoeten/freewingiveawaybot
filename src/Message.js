const config = require('../config');
const CommandManager  = require('./commands/CommandManager');

class Message{

    /**
     * Initialize Message
     *
     * @param message
     * @param client
     */
    constructor(message, client){
        this.message = message;
        this.client = client;
        this.text = message.content.substring(1);
        this.response = (new CommandManager(this.client)).execute(this.text)
    }

    /**
     * Send Message
     */
    send(){
        if(this.response)
            this.message.channel.send(this.response)
    }
}

module.exports = Message;
