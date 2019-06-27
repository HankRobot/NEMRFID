import serial
import subprocess
import codecs

ser = serial.Serial('/dev/ttyUSB0',9600)     #connection to the Arduino

while True:
    message=ser.readline()
    message = codecs.decode(message,'unicode_escape')
    print (message)
    if(message[0:3]=='Got'):
        print("Please enter your password")
        password = input()
        s = subprocess.check_output(["node","transfer.js",str(password)])
        s = codecs.decode(s,'unicode_escape')
        print(s)
    