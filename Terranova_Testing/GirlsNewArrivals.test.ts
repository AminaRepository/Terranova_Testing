import { Builder, By, until, WebDriver } from 'selenium-webdriver';

async function performTest() {
  // Step 1: Open the site
  const driver: WebDriver = await new Builder().forBrowser('chrome').build();
  await driver.get('https://www.terranovastyle.com/ba_bo/');
  //await driver.manage().Window.Maximize();
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

  // Step 4: Find and click on online exclusive page
  const onlineExclusiveXPath = '//*[@id="html-body"]/div[2]/div[2]/div[8]/div[2]/div/a';
  const onlineExclusive = await driver.findElement(By.xpath(onlineExclusiveXPath));

  await driver.executeScript('arguments[0].scrollIntoView();', onlineExclusive);
  await new Promise(r => setTimeout(r, 1000));
  //await onlineExclusive.click();
  await driver
  .executeScript('document.querySelector("#html-body > div.page-wrapper > div.category-content > div.d-none.d-md-flex.background-image-6598d56a9c340 > div:nth-child(2) > div > a").click()');


  // Step 5: Locate filter and click on it
  const filterXPath = '//*[@id="maincontent"]/div[3]/div[1]/div/div/a/i';
  const filter = await driver.findElement(By.xpath(filterXPath));

  await driver.wait(until.elementIsVisible(filter), 10000);
  await driver.wait(until.elementIsEnabled(filter), 10000);

  await driver.executeScript('arguments[0].scrollIntoView();', filter);
  await filter.click();

  // Step 6: Click on News section
  const newsXPath = '//*[@id="sorter-wrapper"]/div/div/div/div[2]/div/a[3]';
  const news = await driver.findElement(By.xpath(newsXPath));
  
  await driver.executeScript('arguments[0].scrollIntoView();', news);
  //await news.click();
  await driver.executeScript('document.querySelector("#sorter-wrapper > div > div > div > div.filter-options-content > div > a:nth-child(3)").click()')

  // Step 7: Check if the news section is open
  const expectedUrl = 'https://www.terranovastyle.com/ba_bo/djevojcice/odjeca/chiara/?product_list_dir=desc&product_list_order=teddy_firstenabled_date';
  const isNewsOpen = await driver.wait(until.urlIs(expectedUrl), 20000);

  if (isNewsOpen) {
    console.log('Test passed: Long sleeve garment page is opened.');
  } else {
    console.error('Test failed: Long sleeve garment page is not opened.');
  }

  await driver.quit();
}

performTest();