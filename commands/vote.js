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

        let collectors = []
        const filter = (reaction) => {
            return reaction.emoji.name === config.voteEmote;
        };

        await message.channel.send(`**${title}**`)
        let msgs = await Promise.all(options.map(async (el, i) => {
            let msg = await message.channel.send(`**${i+1}:** ${el}`)
            collectors.push(msg.createReactionCollector(filter))
            await msg.react(config.voteEmote, {time: 15000})
            return msg
        }))

        msgs.push( await message.channel.send('Results: **Deliberating**') )

        collectors.forEach(collector => {
            collector.on('collect', (reaction, user) => {
                console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);

                let counts = []
                msgs.forEach( (msg, i) => {
                    if( i === msgs.length - 1){
                        //vote total message
                        let max = 1
                        let index = undefined
                        counts.forEach( (e, i) => {
                            if( e > max ) {
                                max = e
                                index = i
                            }
                        })
                        console.log(counts, max, index)
                        for (let i in counts){
                            let e = counts[i]
                            if( e === max && i != index) {
                                //there is a tie
                                console.log(`e: ${e}, max: ${max} i: ${i}, index: ${index}`)
                                msg.edit('Results: **_There is a tie_**')
                                return
                            }
                            msg.edit(`Results: **${msgs[index].content}** *with ${max-1} votes*`)
                        }
                        return;
                    }
                    msg.reactions.cache.forEach(e => {
                        counts.push(e.count)
                    })
                })
            });
        })
	},
};
