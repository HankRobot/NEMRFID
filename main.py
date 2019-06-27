import serial
import subprocess

ser = serial.Serial('/dev/ttyUSB0',9600)     #connection to the Arduino

while True:
    message=ser.readline()
    print (message)
    if(message[0:4]==b'Got:'):
        print("Please enter your password")
        password = input()
        s = subprocess.check.output(["node","transfer.js"+ str(password)])
    