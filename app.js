#!/usr/bin/env node

import puppeteer from 'puppeteer'
import dotenv from 'dotenv'
dotenv.config()
// import jsdom from 'jsdom'
// const dom = new jsdom.JSDOM(`<!DOCTYPE html><p>Hello world</p>`)
// const text = dom.window.document.querySelector('p').textContent

let onAlert = false

async function run() {
  // Launch the browser and open a new blank page
  // const browser = await puppeteer.launch({ headless: 'new' })
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()

  // Navigate the page to a URL
  await page.goto('https://widget.kontramarka.ua/widget11site11204/widget/event/97226')
  // const html = await page.content()
  // await page.screenshot({path: 'example.png'})
  // await page.pdf({path: 'example.pdf', format: 'A4'})

  // Wait for element to be loaded
  await page.waitForSelector(
    '#app > main > div > div > div.schema-block > div > div > div.svg-container--show.svg-container > svg > g > image'
  )
  // await new Promise((r) => setTimeout(r, 10000)) // Adding timeout fix 'alertId' return 'null' sometimes

  const data = await page.evaluate(() => {
    // Browser context
    let dataX = null
    const svgElement = document.querySelector(
      '#app > main > div > div > div.schema-block > div > div > div.svg-container--show.svg-container > svg > g'
    )
    // if (svgPath.attributes['data-alert-id']) dataAlertId = svgPath.attributes['data-alert-id'].value
    dataX = svgElement.innerHTML
    return dataX
  })
  console.log(data)
  // console.log(Object.values(data))
  // for (let i in data) {
  // console.log(i)
  // }

  // Send HTTP GET request to Telegram bot API
  // const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN
  // const telegramChatId = process.env.TELEGRAM_CHAT_ID
  // const telegramMessageAlertOn = '🔴 Повітряна тривога у Закарпатській області'
  // const telegramMessageAlertOff = '🟢 Кінець тривоги'

  // if (alertId && !onAlert) {
  //   await fetch(
  //     `https://api.telegram.org/${telegramBotToken}/sendMessage?chat_id=${telegramChatId}&text=${telegramMessageAlertOn}`
  //   )
  //   onAlert = true
  // }
  // if (!alertId && onAlert) {
  //   await fetch(
  //     `https://api.telegram.org/${telegramBotToken}/sendMessage?chat_id=${telegramChatId}&text=${telegramMessageAlertOff}`
  //   )
  //   onAlert = false
  // }

  await browser.close()
}

// Run every 30 sec
// setInterval(() => {
run()
// }, 30000)
