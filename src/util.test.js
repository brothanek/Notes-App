import puppeteer from 'puppeteer'



test('creates test note', async()=>{
  jest.setTimeout(30000);

    const browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      args: ['--window-size=1920,1080']
    })
    const page = await browser.newPage()
    await page.goto('http://localhost:3000/create')
    await page.click('#headline')
    await page.type('#headline','Test Note')
    await page.click('#content')
    await page.type('#content','Test Content')
    await page.click('#createBtn')
    },50000)