import dotenv from 'dotenv'
dotenv.config()

let newData = 0
let lastData = 0

async function fetchX() {
  const response = await fetch('https://api-widget.kontramarka.ua/api/11/11204/events/97226', {
    // Get headers from 'Copy as cURL' xhr request '97226' in Chrome devtools
    headers: {
      origin: 'https://widget.kontramarka.ua',
      'content-type': 'application/json',
      // 'user-agent':'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36',
      // authority: 'api-widget.kontramarka.ua',
      // accept: '*/*',
      // 'accept-language': 'uk',
      // 'app-language': 'uk',
      // 'cache-control': 'no-cache',
      // pragma: 'no-cache',
      // 'sec-ch-ua': '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
      // 'sec-ch-ua-mobile': '?1',
      // 'sec-ch-ua-platform': '"Android"',
      // 'sec-fetch-dest': 'empty',
      // 'sec-fetch-mode': 'cors',
      // 'sec-fetch-site': 'same-site',
      // referer: 'https://widget.kontramarka.ua/',
      // 'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
    method: 'GET',
    // body: null,
  })

  const data = await response.json()

  if (data.data.freePlacesCount) {
    if (data.data.freePlacesCount > 0) {
      newData = data.data.freePlacesCount
    }
  }

  if (lastData !== newData) {
    lastData = newData
    useBot()
  }

  // Telegram Bot
  async function useBot() {
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN
    const telegramChatId = process.env.TELEGRAM_CHAT_ID
    const telegramMessageInfo = `Появилися квитки на "Гуцулка Ксеня": ${lastData}`

    // Send HTTP GET request to Telegram bot API
    // const response = await fetch(`https://api.telegram.org/${telegramBotToken}/getUpdates`) // Get info about chat id
    const response = await fetch(
      `https://api.telegram.org/${telegramBotToken}/sendMessage?chat_id=${telegramChatId}&text=${telegramMessageInfo}`
    )
    // const data = await response.json()
    // console.log(data)
  }
  // useBot()
}

setInterval(() => {
  fetchX()
}, 60000)
