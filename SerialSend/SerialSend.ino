char mystr[11] = "0B 12 20 23"; //String data

void setup() {
  // Begin the Serial at 9600 Baud
  Serial.begin(9600);
}

void loop() {
  Serial.write(mystr,11); //Write the serial data
  delay(1000);
}
