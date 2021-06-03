const Discord = require("discord.js");

module.exports = function (msg) {
    if (msg.content.length == 7) {
        giveanswer(msg);
    } else {
        msg.reply("Please enter a valid command");
    }
}
async function giveanswer(msg) {

    //create msgEmbed + send it
    const inviteEmbed = new Discord.MessageEmbed()
        .setColor('#00adee')
        .setTitle('Invite link')
        .setDescription('[Invite link](https://discord.com/oauth2/authorize?client_id=842470142704746526&permissions=2147929152&scope=bot)')
        .setThumbnail('https://cdn.discordapp.com/avatars/842470142704746526/07f94c25d5e9b6d67c4879a2d40e3231.png?size=1024')
        .setTimestamp()
        .setFooter('By Hydroxy#2491');

    msg.channel.send(inviteEmbed);
}