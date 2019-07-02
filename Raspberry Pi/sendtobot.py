import telegram

# Connect to our bot
bot = telegram.Bot(token="880592734:AAE6UaNW787kdsFX6xA9RURYz6YezvofkFM")

# Waits for the first incoming message
updates=[]
while not updates:
    updates = bot.getUpdates()

# Gets the id for the active chat
print(updates[-1].message.text)
chat_id=updates[-1].message.chat_id

# Sends a message to the chat
bot.sendMessage(chat_id=chat_id, text="It works!")