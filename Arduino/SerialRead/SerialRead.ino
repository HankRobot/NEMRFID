/*----------------------------------------------------------------------------LoRa Variables--------------------------------------------------------------------------------*/
#include <SPI.h>
#include <RH_RF95.h>

#define RFM95_CS 10
#define RFM95_RST 7
#define RFM95_INT 2
#define node_id "HANK"

// Change to 434.0 or other frequency, must match RX's freq!
#define RF95_FREQ 915.0

// Singleton instance of the radio driver
RH_RF95 rf95(RFM95_CS, RFM95_INT);

/*----------------------------------------------------------------------------LoRa Setup--------------------------------------------------------------------------------*/
void setup() {
  pinMode(RFM95_RST, OUTPUT);
  pinMode(3,HIGH);
  digitalWrite(RFM95_RST, HIGH);

  while (!Serial);
  Serial.begin(9600);
  delay(100);

  Serial.println("Arduino LoRa TX Test!");

  // manual reset
  digitalWrite(RFM95_RST, LOW);
  delay(10);
  digitalWrite(RFM95_RST, HIGH);
  delay(10);

  while (!rf95.init()) {
    Serial.println("LoRa radio init failed");
    while (1);
  }
  Serial.println("LoRa radio init OK!");

  // Defaults after init are 434.0MHz, modulation GFSK_Rb250Fd250, +13dbM
  if (!rf95.setFrequency(RF95_FREQ)) {
    Serial.println("setFrequency failed");
    while (1);
  }
  Serial.print("Set Freq to: "); Serial.println(RF95_FREQ);

  // Defaults after init are 434.0MHz, 13dBm, Bw = 125 kHz, Cr = 4/5, Sf = 128chips/symbol, CRC on

  // The default transmitter power is 13dBm, using PA_BOOST.
  // If you are using RFM95/96/97/98 modules which uses the PA_BOOST transmitter pin, then 
  // you can set transmitter powers from 5 to 23 dBm:
  rf95.setTxPower(23, false);
}

int packetnum = 0;

void LoRaSend(String loramessage){
  digitalWrite(3,HIGH);
  Serial.println("Sending to rf95_server");
  // Send a message to rf95_server

  String radiopacket = loramessage;
  radiopacket += " ";
  radiopacket += String(packetnum++);
  radiopacket += " from ";
  radiopacket += node_id;

  Serial.print("Sending "); Serial.println(radiopacket); delay(10);
  rf95.send((uint8_t*)radiopacket.c_str(), radiopacket.length()+1);

  Serial.println("Waiting for packet to complete..."); delay(10);
  rf95.waitPacketSent();
  // Now wait for a reply
  uint8_t buf[RH_RF95_MAX_MESSAGE_LEN];
  uint8_t len = sizeof(buf);

  Serial.println("Waiting for reply..."); 
  delay(10);
    if (rf95.waitAvailableTimeout(1000))
    { 
      // Should be a reply message for us now   
      if (rf95.recv(buf, &len))
      {
        Serial.print("Got reply: ");
        Serial.println((char*)buf);
        Serial.print("RSSI: ");
        Serial.println(rf95.lastRssi(), DEC);
      }
      else
      {
        Serial.println("Receive failed");
      }
    }
    else
    {
      Serial.println("No reply, is there a listener around? Attempting to send again");
    }
  digitalWrite(3,LOW);
}

void loop() {
  char mystr[22] = "testing";
  Serial.readBytes(mystr,11); //Read the serial data and store in var
  String recmessage = String(mystr);
  if (recmessage == "0B 12 20 23")
  {
    Serial.print("Correct ID: "); //Print data on Serial Monitor
    Serial.print(recmessage); //Print data on Serial Monitor
    LoRaSend(recmessage);
    Serial.print("\n");
  }
  else{
    Serial.print(".");
  }
  delay(1000);
}
