const { urlRegex } = require('../regex/webs');
const { createEmbed } = require('../embeds/embed');

module.exports = (message) => {
    if (message.author.bot) return;

    const match = message.content.match(urlRegex);
    if (match) {
        const embed = createEmbed(match[0]);
        message.reply({ embeds: [embed] });
    }
};