import { Builder, By, until, WebDriver, Key } from 'selenium-webdriver';

async function performTest() { 
  // Step 1: Open the site
  const driver: WebDriver = await new Builder().forBrowser('chrome').build();
  await driver.get('https://www.terranovastyle.com/ba_bo/');
  await driver.manage().window().maximize();

  // Step -: Decline cookies
  const acceptButton = await driver.findElement(By.id("CybotCookiebotDialogBodyButtonDecline"));
  await acceptButton.click();

  // Step -: Click continue button
  const continueButton = await driver.findElement(By.xpath('//*[@id="html-body"]/div[4]/aside[2]/div[2]/footer/button/span'));
  await continueButton.click();

  // Step 2: Locate the search input field
  const searchInput = await driver.findElement(By.id('search'));

  // Step 3: Populate the search input field
  await searchInput.sendKeys('short-sleeved');

  // Step 4: Execute the keyboard action to submit by pressing the 'Enter' key
  await searchInput.sendKeys(Key.RETURN);

  // Step 5: Check if short-sleeved clothing items are displayed
  const expectedUrl = 'https://www.terranovastyle.com/ba_bo/catalogsearch/result/?q=short-sleeved';
  const isShortSleevedOpen = await driver.wait(until.urlIs(expectedUrl), 20000);

  if (isShortSleevedOpen) {
    console.log('Test passed: Short-sleeved clothing items are displayed.');
  } else {
    console.error('Test failed: Short-sleeved clothing items are not displayed.');
  }
  
  // Close the browser
  await driver.quit();
}

performTest();
