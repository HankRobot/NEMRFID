// LoRa 9x_TX
// -*- mode: C++ -*-
// Example sketch showing how to create a simple messaging client (transmitter)
// with the RH_RF95 class. RH_RF95 class does not provide for addressing or
// reliability, so you should only use RH_RF95 if you do not need the higher
// level messaging abilities.
// It is designed to work with the other example LoRa9x_RX

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

void setup() 
{
  pinMode(RFM95_RST, OUTPUT);
  pinMode(3,OUTPUT);
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

int16_t packetnum = 0;  // packet counter, we increment per xmission

void loop()
{
  Serial.println("Sending to rf95_server");
  // Send a message to rf95_server
  digitalWrite(3,HIGH);
  String radiopacket = "Hello World #";
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
    digitalWrite(3,HIGH);
    // Should be a reply message for us now   
    if (rf95.recv(buf, &len))
    {
      Serial.print("Got reply: ");
      Serial.println((char*)buf);
      Serial.print("RSSI: ");
      Serial.println(rf95.lastRssi(), DEC);
      digitalWrite(3,LOW);    
    }
    else
    {
      Serial.println("Receive failed");
      Serial.print("Sending "); Serial.println(radiopacket); delay(10);
      rf95.send((uint8_t*)radiopacket.c_str(), radiopacket.length()+1);

      Serial.println("Waiting for packet to complete..."); delay(10);
      rf95.waitPacketSent();
      digitalWrite(3,LOW);
      delay(2000);  
    }
  }
  else
  {
    Serial.println("No reply, is there a listener around?");
    Serial.print("Sending "); Serial.println(radiopacket); delay(10);
    rf95.send((uint8_t*)radiopacket.c_str(), radiopacket.length()+1);

    Serial.println("Waiting for packet to complete..."); delay(10);
    rf95.waitPacketSent();
    digitalWrite(3,LOW);
    delay(2000);  
  }
  delay(10000); 
}
