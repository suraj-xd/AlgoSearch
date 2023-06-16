const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto('https://leetcode.com/problems/design-parking-system/');
  
  const textValue = await page.evaluate(() => {
    const targetDiv = document.querySelector('.inline-block.rounded-[21px].bg-opacity-[.15].px-2.5.py-1.text-xs.font-medium.capitalize.dark\\:bg-opacity-[.15]');
    return targetDiv ? targetDiv.textContent.trim() : '';
  });

  console.log(textValue);

  await browser.close();
})();
