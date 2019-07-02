import requests

def telegram_bot_sendtext(bot_message):
    
    bot_token = '880592734:AAE6UaNW787kdsFX6xA9RURYz6YezvofkFM'
    bot_chatID = '555564637'
    send_text = 'https://api.telegram.org/bot' + bot_token + '/sendMessage?chat_id=' + bot_chatID + '&parse_mode=Markdown&text=' + bot_message

    response = requests.get(send_text)

    return response.json()
    

test = telegram_bot_sendtext("Testing Telegram bot")
print(test)