#include <ESP8266WiFi.h>
#include<WiFiClientSecure.h>
#include <OneWire.h>
#include <DallasTemperature.h>

//The data wire is plugged into the pin 2 on the ESP8266.
#define ONE_WIRE_BUS 2

//The delay time to wait connection
#define DELAY_TIME 500

//The maximum delay time.
#define DELAY_LIMIT 15000

#define INTERVAL 60000

//The serial number to print out the message, while doing the debugging process.
#define SERIAL_NUM 115200

//Create the OneWire instance to communicate with not only Maxim/Dallas ICs but also any OneWire devices.
OneWire oneWire(ONE_WIRE_BUS);
//Pass the created OneWire object as an argument to create the constructor of the DallasTemperature instance.
DallasTemperature sensors(&oneWire);

//the ssid and password to communicate via network.
const char *ssid = "";
const char *password = "";

const int firstIndex = 0;
const int httpPort = 8080; //the port number for the http connection (use the default http port number)

const char* host = ""; //the name of the host
String url = "/collect"; //the target URL

float temperatureVal; //the value of the temperature that is collected by the sensor.

/**
 * This function collects the temperature data by using the sensor, and return the data string.
 * @return data string
 */
String collectData() {
  sensors.requestTemperatures();

  //There would be multiple sensors on the board, thus, we should specify the sensor by using index.
  temperatureVal = sensors.getTempCByIndex(firstIndex);

  return (String("temperature=") + String(temperatureVal) + String("&latitude=37.492538&longitude=126.9235992") );
}

/**
 * This function will make the WiFi connection.
 *
 * It will print out the failure message if the Arduino is failed to connect to WiFi.
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

    if (count >= DELAY_LIMIT) {
      Serial.println("\nConnection failed :(");
      break;
    }

    count += DELAY_TIME;

  } //the while loop ends

  Serial.print("\nGot WiFi\n\t\tIP address: ");
  Serial.println(WiFi.localIP()); //print out the ip address.
}

/**
 * This function sends the given data string to the target host.
 *
 * @param dataString the data string
 */
void sendData(String dataString) {
  WiFiClient client;

  Serial.print("\nConnecting to ");
  Serial.println(host);

  //check if the http client is connected.
  if (!client.connect(host, httpPort)) {

    Serial.print("Connection failed: ");
    Serial.println(dataString);

    return;
  }

  String header = "GET " + String(url) + "?" + String(dataString) + " HTTP/1.1";

  client.println(header);
  client.println("User-Agent: ESP8266");
  client.println("Host: " + String(host));
  client.println("Connection: closed");
  client.println();

  Serial.println("Data sending process success!\n"); //to debug
}

void setup() {
  Serial.begin(SERIAL_NUM);
  Serial.println("DEBUGGING START\n");

  sensors.begin(); //activate the sensors to collect data

  connectViaNetwork();
}

unsigned long limit = 0;

void loop() {
  if (millis() > limit) {
      limit = millis() + INTERVAL;
      String stringData = collectData();
      sendData(stringData);
  }
}