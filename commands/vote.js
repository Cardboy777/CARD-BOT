const config = require('../test.json');
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
        if(options.length < 2){
            message.channel.send(`Error: Not enough options for voting.`)
            return
        }

        let msgIdsToWatch = []

        await message.channel.send(`**${title}**`)
        await Promise.all(options.map(async (el, i) => {
            let msg = await message.channel.send(`**${i+1}:** ${el}`)
            msgIdsToWatch.push(msg.id)
            await msg.react('👍')
            return msg
        }))

        msgIdsToWatch.push( (await message.channel.send('**Results: _Deliberating_**')).id )

        newList = config.voteMsgsWatchList.concat({
            ids: msgIdsToWatch,
            date: new Date(),
            title
        })

        fs.writeFileSync('test.json', JSON.stringify(Object.assign(config, {
            voteMsgsWatchList: newList.filter( el => (new Date().getTime() - new Date(el.date).getTime()) < 259200000 ) /*259200000 ~ 3 days in ms*/
        })))
	},
};
