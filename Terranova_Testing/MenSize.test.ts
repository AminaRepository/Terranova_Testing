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

  // Step -: Scroll down the page until the “Sellout” subsection is visible
  const selloutXPath = '//*[@id="html-body"]/div[2]/div[2]/div[3]/div[2]/div/a';
  const sellout = await driver.findElement(By.xpath(selloutXPath));
  await driver.executeScript('arguments[0].scrollIntoView();', sellout);
  await driver
  .executeScript('document.querySelector("#html-body > div.page-wrapper > div.category-content > div.d-none.d-md-flex.background-image-6598d1f742187 > div:nth-child(2) > div > a").click()');

  // Step 4: In the top right corner locate the filter and click on it
  const filterXPath = '//*[@id="maincontent"]/div[3]/div[1]/div/div/a';
  const filter = await driver.findElement(By.xpath(filterXPath));

  await driver.wait(until.elementIsVisible(filter), 10000);
  await driver.wait(until.elementIsEnabled(filter), 10000);
  await driver.executeScript('arguments[0].scrollIntoView();', filter);
  await filter.click();

  // Step 5: Click on the "Crna" (Black) colour category (Boja) in the filter
  const blackColorXPath = '//*[@id="narrow-by-list"]/div[1]/div[2]/div/ol/li[1]/a/label';
  const blackColor = await driver.wait(until.elementLocated(By.xpath(blackColorXPath)), 10000);
  await driver.executeScript('arguments[0].scrollIntoView();', blackColor);
  //await blackColor.click();
  await driver.executeScript('document.querySelector("#narrow-by-list > div.filter-options-item.filtercode_tdy_color_family.closed > div.filter-options-content > div > ol > li.item.color-NR > a > label").click()');
  
  // Step 6: Click on 38 Size EU category (Velicina) in the filter
  const sizeXPath = '//*[@id="narrow-by-list"]/div[2]/div[2]/div/div/button[1]/div';
  const size = await driver.wait(until.elementLocated(By.xpath(sizeXPath)), 10000);
  await driver.executeScript('arguments[0].scrollIntoView();', size);
  //await size.click();
  await driver.executeScript('document.querySelector("#narrow-by-list > div.filter-options-item.filtercode_tdy_size.closed > div.filter-options-content > div > div > button:nth-child(1) > div").click()');
  
  // Step 7: Click on the “apply filters” button
  const applyFiltersButtonXPath = '//*[@id="doApplyFilter"]';
  const applyFiltersButton = await driver.findElement(By.xpath(applyFiltersButtonXPath));
  await driver.executeScript('arguments[0].scrollIntoView();', applyFiltersButton);
  
  // Scrolling down the pop-up
  const popupElement = await driver.findElement(By.xpath('//*[@id="layered-filter-block"]/div'));
  await driver.executeScript('arguments[0].scrollTop = arguments[1];', popupElement, 2000); // Scroll 2000 pixels down
  //await applyFiltersButton.click();
  await driver.executeScript('document.querySelector("#doApplyFilter").click()');
  
  // Step 8: Check if the subsection is displayed
  const expectedUrl = 'https://www.terranovastyle.com/ba_bo/musko/rasprodaja/?tdy_color_family=Crna&tdy_size=38%20EU&p=1';
  const isSubsectionDisplayed = await driver.wait(until.urlIs(expectedUrl), 10000);

  if (isSubsectionDisplayed) {
    console.log('Test passed: subsection is displayed.');
  } else {
    console.error('Test failed: subsection is not displayed.');
  }

  // Close the browser window
  await driver.quit();
}

performTest();
