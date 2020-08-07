const {gameLibrary} = require('../config.json');

const cmd_name = 'wswp'
const cmd_usage = '[<game> | ...]'

const endings = [
    'It is as RNJesus foretold',
    "I have spoken",
    ":pepelaugh:",
    "get rekt",
    "...Re-roll?"
]

module.exports = {
	name: cmd_name,
	description: 'Randomly chooses a game to play. If no options are provided, then a game is pulled from the server\'s game library.',
    aliases: ['whatshouldweplay', 'wtp', 'whattoplay'],
    usage: cmd_usage,
	execute(message, args) {
        let games = !args.length ? gameLibrary : message.content.substr(message.content.indexOf(' ')).trim().split(' | ')
        if(games.length < 1){
            message.channel.send(`There are no games to choose from\nGo play Minecraft or something.`)
            return
        }
        message.channel.send(`${games[Math.floor(Math.random() * games.length)]}`)
        message.channel.send(`${endings[Math.floor(Math.random() * endings.length)]}`)
	},
};
