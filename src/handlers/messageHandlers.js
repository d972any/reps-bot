const { createEmbed } = require('../embeds/embed');
const { urlRegex } = require('../regex/webs');
const getPageData = require('../scraping/getPageData');

module.exports = async (message) => {
    if (message.author.bot) return;

    const match = message.content.match(urlRegex);
    if (match) {
        const url = match[0];
        const { title, price } = await getPageData(url);

        const embed = createEmbed(url, title, price);
        message.reply({ embeds: [embed] });
    }
};