#include <LiquidCrystal.h>  // includes the LiquidCrystal Library
#include <ArduinoJson.h>

LiquidCrystal lcd(3, 2, 5, 6, 7, 8);  // Creates an LCD object. Parameters: (rs, enable, d4, d5, d6, d7)




void setup() {
  lcd.begin(16, 2);  // Initializes the interface to the LCD screen, and specifies the dimensions (width and height) of the display }
  pinMode(11, OUTPUT);
  Serial.begin(9600);
  analogWrite(11, 80);
}

int toggle = 0;

void loop() {

  int moistureValue = getMoisture();
  int temperatureValue = getTemperature();
  int humidityValue = getHumidity();
  printSensorVal(moistureValue, temperatureValue, humidityValue);



  int size_ = 0;
  String payload;

  if (Serial.available() > 0) {

    payload = Serial.readStringUntil('\n');
    StaticJsonDocument<512> doc;

    DeserializationError error = deserializeJson(doc, payload);
    if (error) {
      Serial.println(error.c_str());
      return;
    }

    if (doc["request"] == "sensor") {

      StaticJsonDocument<200> obj;
      obj["moisture"] = moistureValue;
      obj["temperature"] = temperatureValue;
      obj["humidity"] = humidityValue;
      serializeJson(obj, Serial);
      Serial.println();

      Serial.flush();
    }
   
    else if (doc["request"] == "device") {
      if (doc["device"] == "drip") {
        if (doc["state"] == "on") {
          
          StaticJsonDocument<200> obj;
          obj["message"] = "State changed to ON";
          //obj["input"] = payload;
          serializeJson(obj, Serial);
          Serial.println();
          turnOnDrip();
          
        } else {
          turnOffDrip();
          StaticJsonDocument<200> obj;
          obj["message"] = "State changed to OFF";
          serializeJson(obj, Serial);
          Serial.println();
         
        }
      }
    }
   
    else {
      StaticJsonDocument<200> obj;
      obj["message"] = "Error";
      obj["payload"] = payload;
      serializeJson(obj, Serial);
      Serial.println();
    }
  }


  // if (toggle == 0) {
  //   turnOnDrip();
  //   toggle = 1;
  // } else {
  //   turnOffDrip();
  //   toggle = 0;
  // }

  delay(1000);
}


void printSensorVal(int mSense, int tSense, int hSense) {
  lcd.setCursor(0, 0);
  lcd.print("M:");
  lcd.print(mSense);
  lcd.print(" ");
  lcd.print("T:");
  lcd.print(tSense);
  lcd.print(" ");
  lcd.print("H:");
  lcd.print(hSense);
}

int getMoisture() {
  return random(99);
}
int getHumidity() {
  return random(99);
}
int getTemperature() {
  return random(99);
}

void turnOnDrip() {
  lcd.setCursor(0, 1);
  lcd.print("DRIP SYSTEM :ON  ");
}

void turnOffDrip() {
  lcd.setCursor(0, 1);
  lcd.print("DRIP SYSTEM :OFF");
}
