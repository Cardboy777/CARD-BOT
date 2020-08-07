const config = require('../config.json');
const fs = require('fs');

const cmd_name = 'settheip'
const cmd_usage = '<ip><:port>|clear'

module.exports = {
	name: cmd_name,
	description: 'Sets the IP address of the currently running game server',
    aliases: [],
    usage: cmd_usage,
	execute(message, args) {
        if (!args.length) {
            return message.channel.send(`Too few arguments!\n**Usage:** \`${config.prefix}${cmd_name} ${cmd_usage}\``)
        }
        const ip = args[0] === 'clear' ? null : args[0]
        fs.writeFileSync('config.json', JSON.stringify(Object.assign(config, {theIP: ip})))
        
        if(!ip) {
            message.channel.send('Cleared TheIP')
            return
        }
        message.channel.send(`TheIP is now set to '${args[0]}'`)
	},
};
