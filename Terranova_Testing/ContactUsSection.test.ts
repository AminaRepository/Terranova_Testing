const { Builder, By, until, Key } = require('selenium-webdriver');

async function performTest() {
  // Step 1: Open the Terranova BiH homepage
  const driver = await new Builder().forBrowser('chrome').build();
  await driver.get('https://www.terranovastyle.com/ba_bo/');

  // Step -: Decline cookies
  const acceptButton = await driver.findElement(By.id("CybotCookiebotDialogBodyButtonDecline"));
  await acceptButton.click();

  // Step -: Click continue button
  const continueButton = await driver.findElement(By.xpath('//*[@id="html-body"]/div[4]/aside[2]/div[2]/footer/button/span'));
  await continueButton.click();

  // Step 2: Scroll to the bottom of the page and locate “contact us” hyperlink
  const contactUsXPath = '//*[@id="main-footer"]/div[1]/div/div/div/div/div/div/div/div/div[2]/div/ul/li/a';
  const contactUs = await driver.findElement(By.xpath(contactUsXPath));
  await driver.executeScript('arguments[0].scrollIntoView();', contactUs);
  //await contactUs.click();
  await driver.executeScript('document.querySelector("#main-footer > div.container.footer__upper > div > div > div > div > div > div > div > div > div:nth-child(2) > div > ul > li > a").click()');

  // step -: Pick the appropriate dropdown option, 
  const dropdownTrigger = await driver.findElement(By.xpath('//*[@id="new_request"]/div/a'));
  await dropdownTrigger.click();
  const optionToSelect = await driver.wait(until.elementLocated(By.xpath('//*[@id="_jq62kxyvx"]')), 50000);
  await driver.wait(until.elementIsVisible(optionToSelect), 10000);
  await driver.wait(until.elementIsEnabled(optionToSelect), 10000);
  //await optionToSelect.click();
  await driver.executeScript('document.querySelector("#_ob5dldvqw").click()');

  // Step 3-6: Populate the input fields
  const email = await driver.findElement(By.id('request_anonymous_requester_email'));
  const requestSubject = await driver.findElement(By.xpath('//*[@id="new_request"]/div[3]/a'));
  const request = await driver.findElement(By.id('request_subject'));
  const message = await driver.findElement(By.id('request_description'));

  await email.sendKeys('potogijahena@gmail.com');
  await requestSubject.sendKeys('Other');
  await request.sendKeys('Bugfixes');
  await message.sendKeys('Please put more effort into the Bosnian Terranova website!');

  // Step 7: Check the Privacy Policy box
  const privacyPolicyCheckbox = await driver.findElement(By.id('request_custom_fields_360009215617'));
  await privacyPolicyCheckbox.click();

  // Step 8: Click on the black submit button
  const submitButton = await driver.findElement(By.xpath('//*[@id="new_request"]/footer/input'));
  await submitButton.click();

  // Step 9: Check if the information is sent successfully
  
  // Close the browser window
  await driver.quit();
}

performTest();
