const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const getPageData = async (url) => {
    let browser;
    try {
        browser = await puppeteer.launch({ headless: true, defaultViewport: null });
        const page = await browser.newPage();

        await page.setViewport({ width: 1200, height: 800 });

        await page.goto('https://basetao.com', { waitUntil: 'networkidle2' });

        await page.waitForSelector('input[name="taobao-url"]', { visible: true });
        await page.type('input[name="taobao-url"]', url);

        const submitButtonSelector = 'button[type="submit"]';
        await page.waitForSelector(submitButtonSelector, { visible: true, timeout: 60000 });
        const submitButton = await page.$(submitButtonSelector);
        if (submitButton) {
            await submitButton.click();
        } else {
            throw new Error('Submit button not found.');
        }

        await page.waitForFunction(
            () => document.querySelector('.py-0') !== null,
            { timeout: 30000 }
        );

        const content = await page.content();
        const $ = cheerio.load(content);

        const titleSelector = '#check_titel';
        const priceSelector = '#total_price';
        const freightSelector = '#freight';
        const imageSelector = '#window_picture';

        const title = $(titleSelector).text().trim();
        const price = $(priceSelector).text().trim();
        const freight = $(freightSelector).text().trim();
        const image = $(imageSelector).attr('src') ? $(imageSelector).attr('src').trim() : '';

        return { title, price, freight, image };

    } catch (error) {
        console.error('Error when scraping:', error);
        return { title: 'Error', price: 'Error' };
    } finally {
        if (browser) {
            await browser.close();
        }
    }
};

module.exports = getPageData;