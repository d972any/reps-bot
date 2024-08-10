const { createEmbed } = require('../embeds/embed');
const { urlRegex } = require('../regex/webs');
const getPageData = require('../scraping/getPageData');

module.exports = async (message) => {
    if (message.author.bot) return;

    const match = message.content.match(urlRegex);
    if (match) {
        const url = match[0];
        const { title, price, freight, image } = await getPageData(url);

        const author = message.author;

        let emoji;
        if (url.includes('taobao.com')) {
            emoji = '<:taobao:1271782520916148316>';
        } else if (url.includes('weidian.com')) {
            emoji = '<:weidian:1271782497163804837>';
        } else if (url.includes('1688.com')) {
            emoji = '<:1688:1271782513919918091>';
        } else {
            emoji = '';
        }

        const embed = createEmbed(url, title, price, freight, image, author, emoji);
        message.reply({ embeds: [embed] });
    }
};
