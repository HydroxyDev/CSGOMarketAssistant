const Discord = require("discord.js");

module.exports = function (msg) {
    if (msg.content.length == 5) {
        giveanswer(msg);
    } else {
        msg.reply("Please enter a valid command");
    }
}

async function giveanswer(msg) {

    //create msgEmbed + send it
    const helpEmbed = new Discord.MessageEmbed()
        .setColor('#00adee')
        .setTitle("Help")
        .setDescription('Commands:')
        .setThumbnail('https://cdn.discordapp.com/avatars/842470142704746526/07f94c25d5e9b6d67c4879a2d40e3231.png?size=1024')
        .addFields({
            name: '?help',
            value: 'Sends this message'
        }, {
            name: '?cma [item name]',
            value: 'Sends a message with the price and more of the item. You need to give the exact English Item Name. StatTrak is not working at the moment!'
        }, {
            name: '?invite',
            value: 'Sends an invite to get this bot on your server'
        })
        .setTimestamp()
        .setFooter('By Hydroxy#2491');

    msg.channel.send(helpEmbed);
}