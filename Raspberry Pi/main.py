import serial
import subprocess
import codecs
import hashlib
import requests
import telegram
import picamera

ser = serial.Serial('/dev/ttyUSB0',9600)     #connection to the Arduino

bot_token = '880592734:AAE6UaNW787kdsFX6xA9RURYz6YezvofkFM'

def telegram_bot_sendtext(bot_message):
    bot_chatID = '555564637'
    send_text = 'https://api.telegram.org/bot' + bot_token + '/sendMessage?chat_id=' + bot_chatID + '&parse_mode=Markdown&text=' + bot_message

    response = requests.get(send_text)

    return response.json()

def telegram_bot_takepicture():
    bot = telegram.Bot(token=bot_token)

    # Sets the id for the active chat
    chat_id='555564637'

    #Get the photo
    camera=picamera.PiCamera()
    camera.capture('./capture.jpg')
    camera.close()

    # Sends a message to the chat
    bot.sendPhoto(chat_id=chat_id, photo=open('./capture.jpg', 'rb'))

while True:
    message=ser.readline()
    message = codecs.decode(message,'unicode_escape')
    print (message)
    if(message[0:3]=='Got'):
        serialID = message[5:16]

        print("Please enter your password")
        password = input()
        bpass = str.encode(serialID+password)
        privatekey = hashlib.sha256(bpass).hexdigest()
        print(privatekey)

        result = subprocess.check_output(["node","transfer.js",privatekey])
        result = codecs.decode(result,'unicode_escape')
        print(result)
        
        telegram_bot_takepicture()
        telegram_bot_sendtext("This person scanned his RFID")
        
    