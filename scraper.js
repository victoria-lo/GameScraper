const puppeteer = require('puppeteer');

async function scrapeGames(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage(); //new blank page
    await page.goto(url); //this page go to url
    const titles = await page.evaluate(() => Array.from(document.querySelectorAll('div.info > h3'), element => element.textContent));
    const prices = await page.evaluate(() => Array.from(document.querySelectorAll('div.info > p.b3'), element => element.textContent));
    console.log(titles, prices);
    browser.close();
}

scrapeGames('https://www.nintendo.com/games/nintendo-switch-new-releases/');
