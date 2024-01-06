import { Builder, By, until, WebDriver } from 'selenium-webdriver';

async function performTest() {
  // Step 1: Open the site
  const driver: WebDriver = await new Builder().forBrowser('chrome').build();
  await driver.get('https://www.terranovastyle.com/ba_bo/');

  // Step -: Decline cookies
  const acceptButton = await driver.findElement(By.id("CybotCookiebotDialogBodyButtonDecline"));
  await acceptButton.click();

  // Step -: Click continue button
  const continueButton = await driver.findElement(By.xpath('//*[@id="html-body"]/div[4]/aside[2]/div[2]/footer/button/span'));
  await continueButton.click();

  // Step 2&3: Locate and click on the Boys section
  const boysXPath = '//*[@id="maincontent"]/div[2]/div/div[1]/div/div/div[3]/div/a/div/div/div/div/p/span';
  const boysSection = await driver.findElement(By.xpath(boysXPath));

  await driver.wait(until.elementIsVisible(boysSection), 10000);
  await driver.wait(until.elementIsEnabled(boysSection), 10000);

  await driver.executeScript('arguments[0].scrollIntoView();', boysSection);
  await boysSection.click();

  // Step 4: Click on Clearance sale and long sleeve garments
  const clearanceXPath = '//*[@id="html-body"]/div[2]/div[2]/div[3]/div[2]/div/a/span';
  const clearance = await driver.findElement(By.xpath(clearanceXPath));

  await driver.wait(until.elementIsVisible(clearance), 10000);
  await driver.wait(until.elementIsEnabled(clearance), 10000);

  await driver.executeScript('arguments[0].scrollIntoView();', clearance);
  await clearance.click();

  const longSleeveXPath = '//*[@id="html-body"]/div[2]/div[2]/div[7]/div[2]/div/a';
  const longSleeve = await driver.findElement(By.xpath(longSleeveXPath));

  await driver.wait(until.elementIsVisible(longSleeve), 10000);
  await driver.wait(until.elementIsEnabled(longSleeve), 10000);

  await driver.executeScript('arguments[0].scrollIntoView();', longSleeve);
  await longSleeve.click();

  // Step 5: Check if the long sleeve garment page is open
  const expectedUrl = 'https://www.terranovastyle.com/ba_bo/djecaci/odjeca/kaputi-i-jakne/';
  const isSleeveOpen = await driver.wait(until.urlIs(expectedUrl), 10000);

  if (isSleeveOpen) {
    console.log('Test passed: Long sleeve garment page is opened.');
  } else {
    console.error('Test failed: Long sleeve garment page is not opened.');
  }

  await driver.quit();
}

performTest();
