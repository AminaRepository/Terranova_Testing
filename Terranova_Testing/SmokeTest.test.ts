import { Builder, By, until, WebDriver } from 'selenium-webdriver';

async function performTest() {
  // Step 1: Open the Terranova BiH homepage
  const driver: WebDriver = await new Builder().forBrowser('chrome').build(); 
  await driver.get('https://www.terranovastyle.com/ba_bo/');

  // Step -: Decline cookies
  const acceptButton = await driver.findElement(By.id("CybotCookiebotDialogBodyButtonDecline"));
  await acceptButton.click();

  // Step -: Click continue button
  const continueButton = await driver.findElement(By.xpath('//*[@id="html-body"]/div[4]/aside[2]/div[2]/footer/button/span'));
  await continueButton.click();

  // Step 2&3: Find and click on the Men's Clothing link
  const mensClothingXPath = '//*[@id="maincontent"]/div[2]/div/div[1]/div/div/div[2]/div/a/div/div/div/div/p/span';
  const mensClothing = await driver.findElement(By.xpath(mensClothingXPath));
  await driver.executeScript('arguments[0].scrollIntoView();', mensClothing);
  await mensClothing.click();

  // Step 4: Scroll down the page until the "Jeans" subsection is visible
  const jeansXPath = '//*[@id="html-body"]/div[2]/div[2]/div[6]/div/div/div[2]/div/a/div/div';
  const jeans = await driver.findElement(By.xpath(jeansXPath));
  await driver.executeScript('arguments[0].scrollIntoView();', jeans);
  
  // Step 5: Click on "Jeans" subsection
  await driver
  .executeScript('document.querySelector("#html-body > div.page-wrapper > div.category-content > div:nth-child(7) > div > div > div:nth-child(2) > div > a > div > div").click()');

  // Step 5: Click on the first "Jeans" item
  const itemXPath = '//*[@id="productitemid-662738"]/div/div[1]/a/div[1]/picture/img';
  const item = await driver.wait(until.elementLocated(By.xpath(itemXPath)), 10000);
  await driver.executeScript('arguments[0].scrollIntoView();', item);
  //await item.click();
  await driver.executeScript('document.querySelector("#productitemid-662738 > div > div.product-item-photo > a > div.product-image-labels > picture > img").click()');
  
  // Step 6: Check if the item is displayed
  const expectedUrl = 'https://www.terranovastyle.com/ba_bo/skinny-fit-jeans-sab0059911001s352-kw-duge-hlace-od-trapera-kw-plava/';
  const isItemDisplayed = await driver.wait(until.urlIs(expectedUrl), 10000);

  if (isItemDisplayed) {
    console.log('Test passed: item is displayed.');
  } else {
    console.error('Test failed: item is not displayed.');
  }

  // Close the browser window
  await driver.quit();
}

performTest();