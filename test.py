import subprocess

s = subprocess.check_output(["node", "transfer.js"])
print("Output: " + str(s)[1:-1])
