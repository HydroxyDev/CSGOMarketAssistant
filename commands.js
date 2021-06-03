const cma = require('./commands/cma.js');
const help = require('./commands/help.js');
const invite = require('./commands/invite.js');

const prefix = "?";
const valid_commands = {
    cma,
    help,
    invite
}

module.exports = function (msg) {
    let words = msg.content.split(' ');
    let command = words.shift();
    if (command.charAt(0) == prefix) {
        command = command.substring(1);
        if (command == "cma" || command == "help" || command == "invite") {
            valid_commands[command](msg, words);
        } else {
            msg.channel.send("Please enter a valid command");
        }

    }
}