const { Client, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const messageHandler = require('./handlers/messageHandlers');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', () => {
    console.log('Bot connected successfully.');
});

client.on('messageCreate', message => {
    messageHandler(message);
});

client.login(token);