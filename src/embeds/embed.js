const { EmbedBuilder } = require('discord.js');

module.exports = {
    createEmbed: (url) => {
        return new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle('URL Detectada')
            .setDescription('Se ha detectado un URL de una pagina valida.')
            .addFields({ name: 'URL', value: url })
            .setTimestamp()
            .setFooter({ text: 'Reps Bot', iconURL: 'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg' }); 
    }
};
