 //Initialized variable to store recieved data

void setup() {
  // Begin the Serial at 9600 Baud
  Serial.begin(9600);
}

void loop() {
  char mystr[22] = "testing";
  Serial.readBytes(mystr,11); //Read the serial data and store in var
  String recmessage = String(mystr);
  if (recmessage == "0B 12 20 23")
  {
    Serial.print("Correct ID: "); //Print data on Serial Monitor
    Serial.print(recmessage); //Print data on Serial Monitor
    Serial.print("\n");
  }
  else{
    Serial.print(".");
  }
  delay(1000);
}
