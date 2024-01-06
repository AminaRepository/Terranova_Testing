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

  // Step 2&3: Find and click on the "About Us" link
  const aboutUsXPath = '//*[@id="main-footer"]/div[1]/div/div/div/div/div/div/div/div/div[1]/div/ul/li[1]/a';
  const aboutUs = await driver.findElement(By.xpath(aboutUsXPath));

  // Wait for the element to be clickable, visible, and enabled
  await driver.wait(until.elementIsVisible(aboutUs), 10000);
  await driver.wait(until.elementIsEnabled(aboutUs), 10000);

  // Scroll into view and click
  await driver.executeScript('arguments[0].scrollIntoView();', aboutUs);
  await driver.executeScript(
    'document.querySelector("#main-footer > div.container.footer__upper > div > div > div > div > div > div > div > div > div:nth-child(1) > div > ul > li:nth-child(1) > a").click()');

  // Step 4: Check if about us page is opened
  const isAboutUsPageOpened = await driver.wait(until.elementIsVisible(By.id('about-us-page')), 10000);

  if (isAboutUsPageOpened) {
    console.log('Test passed: About us page is opened.');
  } else {
    console.error('Test failed: About us page is not opened.');
  }

  // Close the browser window
  await driver.quit();
}

performTest();