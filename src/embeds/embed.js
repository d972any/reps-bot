const { EmbedBuilder } = require('discord.js');

module.exports = {
    createEmbed: (url) => {
        return new EmbedBuilder()
            .setColor('#fcba03')
            .setTitle('URL Detected')
            .setDescription('A valid page URL has been detected.')
            .addFields({ name: 'URL', value: url })
            .setTimestamp()
            .setFooter({ text: 'Reps Bot', iconURL: 'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg' }); 
    }
};