const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
const fs = require('fs');

const getPageData = async (url) => {
    let browser;
    try {
        console.log('Launching the browser...');
        browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

        console.log(`Navigating to URL: ${url}`);
        await page.goto(url, { waitUntil: 'networkidle2' });

        console.log('Taking screenshot of the page...');
        await page.screenshot({ path: 'screenshot.png' });

        const content = await page.content();
        console.log('Obtained HTML content.');

        const $ = cheerio.load(content);

        let title = '', price = '';

        if (url.includes('taobao.com')) {
            console.log('Extracting data from TaoBao...');
            title = $('#item-title').text().trim();
            price = $('#price').text().trim();
        } else if (url.includes('weidian.com')) {
            console.log('Extracting data from Weidian...');
            title = $('.item-title-content').text().trim();
            price = $('.cur-price.wd-theme__price').text().trim();
        } else if (url.includes('1688.com')) {
            console.log('Extracting data from 1688...');
            title = $('.title-text').text().trim();
            price = $('.price-text').text().trim();

            if (!title && !price) {
                console.log('It looks like there is a CAPTCHA or the data was not extracted correctly.');
            } else {
                console.log(`Extracted title: ${title}`);
                console.log(`Extracted price: ${price}`);
            }
        } else {
            throw new Error('URL not supported for scraping.');
        }

        return { title, price };

    } catch (error) {
        console.error('Error when scraping:', error);

        if (browser) {
            console.log('Taking screenshot of the error...');
            await page.screenshot({ path: 'error.png' });
        }

        return { title: 'Error', price: 'Error' };
    } finally {
        if (browser) {
            await browser.close();
            console.log('Browser closed.');
        }
    }
};

module.exports = getPageData;