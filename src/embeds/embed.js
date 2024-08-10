const { EmbedBuilder } = require('discord.js');

module.exports = {
    createEmbed: (url, title, price, freight, image, author, emoji) => {
        const authorName = author ? author.username : 'Unknown';
        const authorAvatar = author ? author.displayAvatarURL() : 'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg';

        return new EmbedBuilder()
            .setColor('#fcba03')
            .setAuthor({
                name: authorName,
                iconURL: authorAvatar
            })
            .setTitle(emoji + title || 'No title available')
            .setURL(url)
            .addFields(
                { name: 'Price', value: price ? "¥" + price : 'Not available', inline: true },
                { name: 'Freight', value: freight ? "¥" + freight : 'Not available', inline: true },
            )
            .setImage(image)
            .setFooter({ text: 'Reps Bot', iconURL: 'https://www.shutterstock.com/image-vector/blank-avatar-photo-place-holder-600nw-1095249842.jpg' })
    }
};
