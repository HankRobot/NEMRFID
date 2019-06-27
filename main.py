import serial
import subprocess
import codecs

ser = serial.Serial('/dev/ttyUSB0',9600)     #connection to the Arduino

while True:
    message=ser.readline()
    message = codecs.decode(message,'unicode_escape')
    print (message)
    if(message[0:3]=='Got'):
        serialID = "1234567"

        print("Please enter your password")
        password = input()
        bpass = str.encode(serialID+password)
        privatekey = hashlib.sha3_256(bpass).hexdigest()
        print(privatekey)

        s = subprocess.check_output(["node","transfer.js",privatekey])
        s = codecs.decode(s,'unicode_escape')
        print(s)
    