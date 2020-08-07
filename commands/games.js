const {gameLibrary} = require('../config.json');

module.exports = {
	name: 'games',
	description: 'Returns a list of games in the server\'s game library',
    aliases: ['listgames'],
	execute(message) {
        if(gameLibrary.length < 1){
            message.channel.send(`There are currently no games in the server's game library.`)
            return
        }

        games = '';
        gameLibrary.map(game => games += game + '\n')
        message.channel.send(games.trim())
	},
};
