const { createEmbed } = require('../embeds/embed');
const { urlRegex } = require('../regex/webs');
const getPageData = require('../scraping/getPageData');
const { emojis } = require('../data/variables.json');

module.exports = async (message) => {
    if (message.author.bot) return;

    const match = message.content.match(urlRegex);
    if (match) {
        const url = match[0];
        const { title, price, freight, image } = await getPageData(url);

        const author = message.author;

        let emoji;
        if (url.includes('taobao.com')) {
            emoji = emojis.taobao;
        } else if (url.includes('weidian.com')) {
            emoji = emojis.weidian;
        } else if (url.includes('1688.com')) {
            emoji = emojis['1688'];
        } else {
            emoji = '';
        }

        const embed = createEmbed(url, title, price, freight, image, author, emoji);
        message.reply({ embeds: [embed] });
    }
};