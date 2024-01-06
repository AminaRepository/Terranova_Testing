This is a project for the Software Verification, Validation and Testing course.
We are performing various tests in Selenium on a chosen website / application.

For the project, we are going to test the Terranova website.
It is the official website of the Terranova store meant to be used by customers to order clothes,
as well as contact stores to obtain information about prizes, availability, etc.
We will test various links on the site, the functionalities the website offers,
and whether or not the site works as intended.
The link to the website: https://www.terranovastyle.com/ba_bo/

There will be one smoke test and ten test cases.

Note: a lot of the time we had to use driver.executeScript('JSPath.click()') instead of section.click() when trying to click buttons, pages etc.
In those cases, the original code was usually commented out and the replacement option was used.

Note: The uploaded files are missing the node_modules folder, so to run the code there need to be necessary installments with npm install --save-dev jest
