/*
 * 
 * All the resources for this project: https://github.com/HankRobot/LoRaBlockchain
 * Built by HankRobot
 * 
 * Check out my website https://hankrobot.wordpress.com/
 * 
 */
#include <SPI.h>
#include <MFRC522.h>
 
#define SS_PIN 8
#define RST_PIN 9
MFRC522 mfrc522(SS_PIN, RST_PIN);   // Create MFRC522 instance.

/*--------------------------------------------------------SoftwareSerial communication to Arduino---------------------------------------*/
#include <SoftwareSerial.h>
SoftwareSerial mySerial(2, 3); // RX, TX
/*--------------------------------------------------------main setup function-----------------------------------------------------------*/
void setup() 
{
  pinMode(4,OUTPUT);
  Serial.begin(9600);   // Initiate a serial communication
  SPI.begin();      // Initiate  SPI bus
  mfrc522.PCD_Init();   // Initiate MFRC522
  Serial.println("Approximate your card to the reader...");
  Serial.println();

  //Begin setup for SoftwareSerial
  mySerial.begin(4800);
  mySerial.println("Hello, world?");
}

void loop() 
{
  digitalWrite(4,LOW);
  // Look for new cards
  if ( ! mfrc522.PICC_IsNewCardPresent()) 
  {
    return;
  }
  // Select one of the cards
  if ( ! mfrc522.PICC_ReadCardSerial()) 
  {
    return;
  }
  //Show UID on serial monitor
  Serial.print("UID tag :");
  String content= "";
  byte letter;
  for (byte i = 0; i < mfrc522.uid.size; i++){
    Serial.print(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " ");
    Serial.print(mfrc522.uid.uidByte[i], HEX);
    content.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " "));
    content.concat(String(mfrc522.uid.uidByte[i], HEX));
  }
  Serial.println();
  Serial.print("Message : ");
  content.toUpperCase();
  if (content.substring(1) == "0B 12 20 23"){ //change here the UID of the card/cards that you want to give access
    digitalWrite(4,HIGH);
    Serial.println("Authorized access");
    Serial.println();

    mySerial.write(content.substring(1),11);
    delay(3000);
  }
  else{
    Serial.println(" Access denied");
    delay(3000);
  }
} 