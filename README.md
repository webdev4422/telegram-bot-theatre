# Telegram bot with Puppeteer

Puppeteer is a testing library and headless chrome automation tool https://pptr.dev/
Telegram HTTP API https://core.telegram.org/api

This bot works by scraping given website every 30 second and checking status on svg element attributes.

## Deployment

```
ssh -i ~/.ssh/ubuntu-22-x64_key.pem azureuser@xxx.xxx.xxx.xxx
cd telegram-bot-theatre/
git pull
sudo systemctl restart telegram-bot
```
