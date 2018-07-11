#include <ESP8266WiFi.h>
#include<WiFiClientSecure.h>
#include <OneWire.h>
#include <DallasTemperature.h>

//The data wire is plugged into the pin 2 on the ESP8266.
#define ONE_WIRE_BUS 2

//The serial number to print out the message, while doing the debugging process.
#define SERIAL_NUM 115200

//The maximum delay time.
#define DELAY_TIME 500

#define INTERVAL 60000

//Create the OneWire instance to communicate with not only Maxim/Dallas ICs but also any OneWire devices.
OneWire oneWire(ONE_WIRE_BUS);
//Pass the created OneWire object as an argument to create the constructor of the DallasTemperature instance.
DallasTemperature sensors(&oneWire);

//the ssid and password to communicate via network.
const char *ssid = "";
const char *password = "";

//TODO the names should be changed..
const char* host = ""; //the name of the host
String url = ""; //the target URL

int temperature; //the value of the temperature that is collected by the sensor.

/**
 * This function will make the WiFi connection.
 * If will print out the failure message if the Arduino is failed to connect to WiFi.
 */
void connectViaNetwork() {
  Serial.print("Connecting to ");
  Serial.println(ssid);

  //Start the wifi connection.
  WiFi.begin(ssid, password);

  int count = 0;

  //iterate the while loop until the WiFi is connected
  while (WiFi.status() != WL_CONNECTED) {
    delay(DELAY_TIME);
    Serial.print(".");

    if (count >= DELAY_TIME) {
      Serial.println("\nConnection failed :(");
      break;
    }

    //TODO probably I should write some code to modify the value of the count..
    
  } //the while loop ends

  Serial.print("\nGot WiFi\n\t\tIP address: ");
  Serial.println(WiFi.localIP()); //print out the ip address.
}

void setup() {
  Serial.begin(SERIAL_NUM);
  Serial.println("DEBUGGING START\n");
  
  sensors.begin(); //activate the sensors to collect data
  
  connectViaNetwork();
}

unsigned long limit = 0;
unsigned long tVal = 0;

void loop() {
  if ( (tVal = millis()) > limit) {
      limit = millis() + INTERVAL;
  }
}
