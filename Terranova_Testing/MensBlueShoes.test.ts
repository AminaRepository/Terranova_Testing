import { Builder, By, until, WebDriver } from 'selenium-webdriver';
 
async function performTest() {
  // Step 1: Open the Terranova BiH homepage
  const driver: WebDriver = await new Builder().forBrowser('chrome').build(); 
  await driver.get('https://www.terranovastyle.com/ba_bo/');
  await driver.manage().window().maximize();
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

  // Step 4&5: Hover over the Men's hyperlink, shoes section
  const accessoriesMenuXPath = '//*[@id="main-navigation"]/div[2]/div/div/ul/li[2]/a/span';
  const shoesSubMenuXPath = '//*[@id="main-navigation"]/div[2]/div/div/ul/li[2]/div/div[1]/ul[4]/li/ul/li[1]/a/span';

  const accessoriesMenu = await driver.findElement(By.xpath(accessoriesMenuXPath));
  const shoesSubMenu = await driver.findElement(By.xpath(shoesSubMenuXPath));

  await driver.actions({ bridge: true }).move({ origin: accessoriesMenu } as any).perform();
  await driver.wait(until.elementIsVisible(shoesSubMenu), 10000);
  await driver.executeScript('arguments[0].click();', shoesSubMenu);

  // Step 6: Click on the filter
  const filterXPath = '//*[@id="maincontent"]/div[3]/div[1]/div/div/a';
  const filter = await driver.findElement(By.xpath(filterXPath));
  await driver.wait(until.elementIsVisible(filter), 10000);
  await driver.executeScript('arguments[0].scrollIntoView();', filter);
  await filter.click();

  // Step 7: Click on the Blue colour category (Boja) in the filter
  const filterSideXPath = '//*[@id="maincontent"]/div[3]/div[1]/div/div/a';
  const filterSide = await driver.findElement(By.xpath(filterSideXPath));
  await driver.wait(until.elementIsVisible(filterSide), 10000);
  await driver.executeScript('arguments[0].scrollIntoView();', filterSide);
  await driver.executeScript('arguments[0].click();', filterSide);

  const blueColorXPath = '//*[@id="narrow-by-list"]/div[1]/div[2]/div/ol/li[2]/a/label';
  const blueColor = await driver.wait(until.elementLocated(By.xpath(blueColorXPath)), 10000);
  await driver.executeScript('arguments[0].scrollIntoView();', blueColor);
  //await blueColor.click();
  await driver.executeScript('document.querySelector("#narrow-by-list > div.filter-options-item.filtercode_tdy_color_family.closed > div.filter-options-content > div > ol > li.item.color-BL > a > label").click()');

  // Step 8: Click on the "apply filters" button
  const applyFiltersButtonXPath = '//*[@id="doApplyFilter"]';
  const applyFiltersButton = await driver.findElement(By.xpath(applyFiltersButtonXPath));
  await driver.wait(until.elementIsVisible(applyFiltersButton), 10000);
  await driver.executeScript('arguments[0].scrollIntoView();', applyFiltersButton);
  //await applyFiltersButton.click();
  await driver.executeScript('document.querySelector("#doApplyFilter").click()');

  // Step 9: Check if the subsection is displayed
  const expectedUrl = 'https://www.terranovastyle.com/ba_bo/musko/modni-dodaci/cipele/?tdy_color_family=Plava&p=1';
  const isSubsectionDisplayed = await driver.wait(until.urlIs(expectedUrl), 10000);

  if (isSubsectionDisplayed) {
    console.log('Test passed: Subsection of blue men’s shoes is displayed.');
  } else {
    console.error('Test failed: Subsection of blue men’s shoes is not displayed.');
  }

  // Close the browser window
  await driver.quit();
}

performTest();
