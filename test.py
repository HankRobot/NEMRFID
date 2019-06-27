import subprocess

print("Please enter your password")
password = input()
s = subprocess.check.output(["node","transfer.js"+ str(password)])
