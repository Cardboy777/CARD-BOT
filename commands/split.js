const { prefix } = require('../config.json');
const cmd_name = 'split'
const cmd_usage = '<message> | ...'

module.exports = {
	name: cmd_name,
	description: 'Split a single message into multiple messages.',
    aliases: [],
    usage: cmd_usage,
	execute(message, args) {
        if (!args.length) {
            return message.channel.send(`Too few arguments!\n**Usage:** \`${prefix}${cmd_name} ${cmd_usage}\``)
        }

        const messages = message.content.substr(message.content.indexOf(' ')).trim().split(' | ')
        messages.map( msg => {
            if (!msg.trim().length) return
            message.channel.send(msg.trim())
        })
	},
};
