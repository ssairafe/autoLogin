var puppeteer = require('puppeteer');
var fetch = require('node-fetch');

function submitUrl() {
  event.preventDefault();
  var urlToPost = document.getElementById('url').value;
  console.log(urlToPost);
  fetch('http://localhost:3000/api/loginServer', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({urlToPost})
  })
}


async function main(site, user, password, secondSite) {
  // start browser and open page in incognito
  // go to target url

  var browser = await puppeteer.launch({
    defaultViewport: null,
    headless: false,
    args: ['--account-consistency']
  });

  var context = await browser.createIncognitoBrowserContext();
  var page = await context.newPage();
  await page.goto(site);

  // await username input then populate with username
  // await submit button then focus on it then enter
  await page.waitFor('input[name=username]');
  // await page.$eval('input[name=username]', el => el.value = user);
  await page.focus('input[name=username]');
  await page.keyboard.type(user);
  await page.waitFor(2000);
  await page.focus('input[type=submit]');
  await page.keyboard.type('\n');

  // await password input
  // populate password then enter
  await page.waitFor('input[name=password]');
  await page.focus('input[name=password]');
  await page.keyboard.type(password);
  await page.waitFor('#login-signin');
  await page.focus('#login-signin');
  await page.keyboard.type('\n');
  await page.waitFor(3000);
  await page.cookies();
  await page.goto(secondSite);
}

function getUserData() {
  fetch('http://localhost:3000/api/loginServer')
    .then(res => res.json())
    .then(res => {
      for (let i = 0; i < res.length; i++) {
        var website = res[i].website;
        var username = res[i].username;
        var password = res[i].password;
        var secondSite = res[i].secondUrl;

        main(website, username, password, secondSite);
      }
    })
    .catch(err => console.log(err));
}

// Start the script


 getUserData();
