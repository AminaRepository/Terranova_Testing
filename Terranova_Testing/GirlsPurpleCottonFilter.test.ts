import { Builder, By, until, WebDriver } from 'selenium-webdriver';
 
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

  // Step 2&3: Locate and click on the Girls section
  const girlsXPath = '//*[@id="maincontent"]/div[2]/div/div[1]/div/div/div[4]/div/a/div/div/div/div/p/span';
  const girlsSection = await driver.findElement(By.xpath(girlsXPath));

  await driver.wait(until.elementIsVisible(girlsSection), 10000);
  await driver.wait(until.elementIsEnabled(girlsSection), 10000);

  await driver.executeScript('arguments[0].scrollIntoView();', girlsSection);
  await girlsSection.click();

  // Step 4: Scroll down the page until the “Online Exclusive” subsection is visible
  const onlineExclusiveXPath = '//*[@id="html-body"]/div[2]/div[2]/div[8]/div[2]/div/a';
  const onlineExclusive = await driver.findElement(By.xpath(onlineExclusiveXPath));
  await driver.executeScript('arguments[0].scrollIntoView();', onlineExclusive);
  await driver
  .executeScript('document.querySelector("#html-body > div.page-wrapper > div.category-content > div.d-none.d-md-flex.background-image-6598d56a9c340 > div:nth-child(2) > div > a").click()');
  
  // Step 5: In the top right corner locate the filter and click on it
  const filterXPath = '//*[@id="maincontent"]/div[3]/div[1]/div/div/a/i';
  const filter = await driver.findElement(By.xpath(filterXPath));

  await driver.wait(until.elementIsVisible(filter), 10000);
  await driver.wait(until.elementIsEnabled(filter), 10000);
  await driver.executeScript('arguments[0].scrollIntoView();', filter);
  await filter.click();

  // Step 6: Click on the “Ljubičasta” (purple) colour category (Boja) in the filter
  const purpleColorXPath = '//*[@id="narrow-by-list"]/div[2]/div[2]/div/ol/li[10]/a/label';
  const purpleColor = await driver.wait(until.elementLocated(By.xpath(purpleColorXPath)), 10000);
  await driver.executeScript('arguments[0].scrollIntoView();', purpleColor);
  //await purpleColor.click();
  await driver.executeScript('document.querySelector("#narrow-by-list > div.filter-options-item.filtercode_tdy_color_family.closed > div.filter-options-content > div > ol > li.item.color-VL > a > label").click()');
  
  // Step 7: Click on “Pamuk”. (cotton) material category (Sastav) in the filter
  const cottonMaterialXPath = '//*[@id="narrow-by-list"]/div[4]/div[2]/div/ol/li[2]/a/label/div[2]';
  const cottonMaterial = await driver.wait(until.elementLocated(By.xpath(cottonMaterialXPath)), 10000);
  await driver.executeScript('arguments[0].scrollIntoView();', cottonMaterial);
  //await cottonMaterial.click();
  await driver.executeScript('document.querySelector("#narrow-by-list > div.filter-options-item.filtercode_tdy_material.closed > div.filter-options-content > div > ol > li:nth-child(2) > a > label > div:nth-child(2) > span").click()');

  // Step 8: Scroll down the filter until the “apply filters” button is located
  const applyFiltersButtonXPath = '//*[@id="doApplyFilter"]';
  const applyFiltersButton = await driver.findElement(By.xpath(applyFiltersButtonXPath));
  await driver.executeScript('arguments[0].scrollIntoView();', applyFiltersButton);
  
  // Scrolling down the pop-up
  const popupElement = await driver.findElement(By.xpath('//*[@id="layered-filter-block"]/div'));
  await driver.executeScript('arguments[0].scrollTop = arguments[1];', popupElement, 2000); // Scroll 2000 pixels down
    
  // Step 9: Click on the “apply filters” button
  //await applyFiltersButton.click();
  await driver.executeScript('document.querySelector("#doApplyFilter").click()');

  // Step 10: Check if the subsection of purple and cotton girls’ clothing is displayed
  const expectedUrl = 'https://www.terranovastyle.com/ba_bo/djevojcice/odjeca/chiara/?tdy_color_family=Ljubičasta&tdy_material=Pamuk&p=1';
  const isSubsectionDisplayed = await driver.wait(until.urlIs(expectedUrl), 10000);

  if (isSubsectionDisplayed) {
    console.log('Test passed: Purple and cotton girls’ clothing subsection is displayed.');
  } else {
    console.error('Test failed: Purple and cotton girls’ clothing subsection is not displayed.');
  }

  await driver.quit();
}

performTest();
