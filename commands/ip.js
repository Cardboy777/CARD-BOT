const { prefix, theIP } = require('../config.json');

module.exports = {
	name: 'ip',
	description: 'Posts the IP address of the currently running game server',
    aliases: ['theip', 'whatstheip'],
	execute(message) {
        if(!theIP){
            message.channel.send('There is currently no active game server running')
        }
        message.channel.send(theIP)
	},
};
