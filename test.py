import subprocess
import codecs

print("Please enter your password")
password = input()
s = subprocess.check_output(["node","transfer.js",str(password)])
s = codecs.decode(s,'unicode_escape')
print(s)
