console.log("CS:GO Market Assistant bot is starting...");
require("dotenv").config();

const Discord = require("discord.js");
const client = new Discord.Client();

//*Verbingung zu Discord

client.login(process.env.BOTTOKEN);

client.on("ready", readyDiscord);

function readyDiscord() {
    console.log("CS:GO Market Assistant bot is online and ready to use...");
}
//*Ende des Anfangs

const commandHandler = require("./commands");
client.on("message", commandHandler);

//*Rich Presence

client.on('ready', () => {
    setInterval(() => {
        client.user.setActivity(`${client.guilds.cache.size} Servers | ?help`, {
            type: 'WATCHING'
        })
    }, 60000); // Runs this every 60 seconds.
});

//*Api error handler

process.on('unhandledRejection', error => {
    console.error('Unhandled promise rejection:', error);
});