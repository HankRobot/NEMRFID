import serial
import subprocess
import codecs
import hashlib

ser = serial.Serial('/dev/ttyUSB0',9600)     #connection to the Arduino

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

        s = subprocess.check_output(["node","transfer.js",privatekey])
        s = codecs.decode(s,'unicode_escape')
        print(s)
    