const config = require('../config.json');
const fs = require('fs');

const cmd_name = 'vote'
const cmd_usage = '<title> | <option1> | <option2> | ...'

module.exports = {
	name: cmd_name,
	description: 'Organizes a vote.',
    aliases: [],
    usage: cmd_usage,
	async execute(message, args) {
        if (!args.length) {
            message.channel.send(`You need to provide a title and voting options. Type \`${config.prefix}help ${cmd_name}\` for details.`)
            return
        }
        let options = message.content.substr(message.content.indexOf(' ')).trim().split(' | ')
        let title = options.shift().trim();

        if(!title.length){
            message.channel.send(`Error: Invalid title.`)
            return
        }
        console.log(options)
        if(options.length < 2){
            message.channel.send(`Error: Not enough options for voting.`)
            return
        }

        let msgIdsToWatch = []

        message.channel.send(`**${title}**`)
        options.map(async (el, i) => {
            await message.channel.send(`**${i+1}:** ${el}`).then( msg => {
                msgIdsToWatch.push(msg.id)
                msg.react('U+1F44D')
            })
        })
        await message.channel.send('**Results: _Deliberating_**').then( msg => {
            msgIdsToWatch.push(msg.id)
            msg.react('1F44D')
        })

        newList = config.voteMsgsWatchList.concat({
            ids: msgIdsToWatch,
            date: new Date(),
            title
        })

        fs.writeFileSync('config.json', JSON.stringify(Object.assign(config, {
            voteMsgsWatchList: newList.filter( el => (new Date().getTime() - el.date.getTime()) < 259200000 ) /*3 days in ms*/
        })))
	},
};
