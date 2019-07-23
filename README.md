# LoRaBlockchain :laughing:
Living the dream, implementing NEM Catapult with LoRa XD
This repository is about RFID info transaction via LoRa nodes using NEM Catapult Mosaics Transaction

# This repository is currently in development...
1. Folder nem message contains code for receiving and sending message via NEM Blockchain
2. Folder nem multisignature contains code for multisignature account transactions, still in development.
3. Folder node_modules should not be touched as it contains js libraries.
4. Folder RFIDRead reads the ID of a card and serial writes it out to another Arduino due to insufficient pins for RFID + LoRa Configuration.
5. Folder SerialRead reads serial from another arduino and attempts to send a LoRa message to Raspberry Pi.
6. Folder server is for default testing between Folder client.
7. main.py, the main code to be run on the raspberry pi.
8. transfer.js, executed by main.py via shell to transfer mosaics to the blockchain.

#Libraries for the Arduino
1. https://github.com/CytronTechnologies/RadioHead for the LoRa Shield to work.
2. https://github.com/miguelbalboa/rfid/archive/master.zip for the RFID hardware to work.

# Getting Started
1. Download the zip code of this file, then extract it.
1. Alternatively you can fork this project and open in Visual Studios and use the Team Explorer in Visual Studios to help you clone the entire project.
2. Open the folder and open a command prompt, and type npm install.
3. Once finished, open the folder with Visual Studio Code / Arduino depending on the file.
4. main.py is executed on the raspberry pi by typing in the terminal python main.py, make sure transfer.js is in the same directory.
5. RFIDRead.ino is uploaded to Arduino with RFID hardware, SerialRead.ino is uploaded to Arduino with LoRa hardware, both are connected TX to RX.
6. server.ino is uploaded to Arduino with LoRa hardware connected with a USB port to Raspberry Pi.

# Contribute
1. Use case of LoRa + Blockchain, need ideas, feel free to open an issue about it.
2. Attempting to implement NEM Catapult docker, but so far docker-compose library is not supported.

#HAPPY CODING!!! :heart: