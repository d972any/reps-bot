const { Client, GatewayIntentBits } = require('discord.js');
const { token, channelID } = require('./data/config.json');
const messageHandler = require('./handlers/messageHandlers');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
});

client.once('ready', () => {
    console.log('Bot connected successfully.');
});

client.on('messageCreate', async (message) => {
    try {
        await messageHandler(message);
    } catch (error) {
        console.error('Error in message handler:', error);
    }
});

client.login(token).catch(error => {
    console.error('Failed to login:', error);
});