const config = require('../config.json');
const fs = require('fs');

const cmd_name = 'addgame'
const cmd_usage = '<game> | ...'

module.exports = {
	name: cmd_name,
	description: 'Adds game(s) to the server\'s game library',
    aliases: ['addgames'],
    usage: cmd_usage,
	execute(message, args) {
        if (!args.length) {
            return message.channel.send(`Too few arguments!\n**Usage:** \`${config.prefix}${cmd_name} ${cmd_usage}\``)
        }
        const newGames = message.content.substr(message.content.indexOf(' ')).trim().split(' | ')
        let games = config.gameLibrary
        newGames.map(game => {
            if (!game.trim().length) return
            games.push(game)
        })
        
        fs.writeFileSync('config.json', JSON.stringify(Object.assign(config, {gameLibrary: games})))
        
        if (newGames.length > 1){
            message.channel.send(`Games added to server's game library`)
            return
        }
        message.channel.send(`'${args[0]}' added to server's game library`)
	},
};
