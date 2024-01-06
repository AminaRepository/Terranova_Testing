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

  // Step 2&3: Find and click on the Women's Clothing link
  const womensClothingXPath = '//*[@id="maincontent"]/div[2]/div/div[1]/div/div/div[1]/div/a/div/div/div/div';
  const womensClothing = await driver.findElement(By.xpath(womensClothingXPath));
  await driver.executeScript('arguments[0].scrollIntoView();', womensClothing);
  await womensClothing.click();

  // Step 4: Check if Women's Clothing section is displayed
  const expectedUrl = 'https://www.terranovastyle.com/ba_bo/zensko/';
  const isWomensClothingSectionDisplayed = await driver.wait(until.urlIs(expectedUrl), 10000);

  if (isWomensClothingSectionDisplayed) {
    console.log('Test passed: Women’s Clothing section is displayed.');
  } else {
    console.error('Test failed: Women’s Clothing section is not displayed.');
  }

  // Close the browser window
  await driver.quit();
}

performTest();