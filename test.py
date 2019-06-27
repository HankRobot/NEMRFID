import subprocess
import codecs
import hashlib

serialID = "1234567"

print("Please enter your password")
password = input()
bpass = str.encode(serialID+password)
privatekey = hashlib.sha3_256(bpass).hexdigest()
print(privatekey)


#s = subprocess.check_output(["node","transfer.js",privatekey])
#s = codecs.decode(s,'unicode_escape')
#print(s)



