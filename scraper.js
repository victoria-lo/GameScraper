const puppeteer = require('puppeteer');
var fs = require('fs');

async function scrapeGames(url){
    const browser = await puppeteer.launch();
    const page = await browser.newPage(); //new blank page
    await page.goto(url); //this page go to url
    const titles = await page.evaluate(() => Array.from(document.querySelectorAll('div.info > h3'), element => element.textContent));
    const prices = await page.evaluate(() => Array.from(document.querySelectorAll('div.info > p.b3'), element => element.textContent));
    const dates = await page.evaluate(() => Array.from(document.querySelectorAll('div.info > p.row-date'), element => element.textContent));
    let json = [];
    for(let i = 0; i< titles.length; i++){
        var title = titles[i];
        var price = prices[i];
        var date = dates[i];
        json.push([title,price, date]);
    }
    writeToFile(JSON.stringify(json,null,2));

    browser.close();
}

scrapeGames('https://www.nintendo.com/games/nintendo-switch-new-releases/');

function writeToFile(json){
    fs.writeFile("data.json", json, function(err) {
        if (err) {
            console.log(err);
        }
    });
}


