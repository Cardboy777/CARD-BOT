const config = require('../config.json');
const fs = require('fs');

const cmd_name = 'delgame'
const cmd_usage = '<game>'

module.exports = {
	name: cmd_name,
	description: 'Deletes a game from server\'s game library',
    aliases: ['remgame, removegame, deletegame'],
    usage: cmd_usage,
	execute(message, args) {
        if (!args.length) {
            return message.channel.send(`Too few arguments!\n**Usage:** \`${config.prefix}${cmd_name} ${cmd_usage}\``)
        }
        const game = message.content.substr(message.content.indexOf(' ')).trim()
        let games = config.gameLibrary.filter(el => el !== game)
        
        if (games.length === config.gameLibrary.length){
            message.channel.send(`There was an error removing game:\nCould not find game '${game}'`)
            return
        }

        fs.writeFileSync('config.json', JSON.stringify(Object.assign(config, {gameLibrary: games})))
        
        message.channel.send(`'${args[0]}' removed from server's game library`)
	},
};
