#include <Arduino_FreeRTOS.h>

void TaskRunMotors( void *pvParameters );
void TaskReadSerial( void *pvParameters );

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  
  while (!Serial) {;}

  pinMode(13, OUTPUT);

  xTaskCreate(
    TaskRunMotors
    ,  "RunMotors"   
    ,  128  
    ,  NULL
    ,  1  
    ,  NULL );

  xTaskCreate(
    TaskReadSerial
    ,  "ReadSerial"
    ,  128  
    ,  NULL
    ,  2  
    ,  NULL );
    
}

void loop() {
  // put your main code here, to run repeatedly:
  // HAHA nope
}

// Global variables
// Motor pins
int ENA = 5; // Left enable
int ENB = 6; // Right enable

int IN1 = 7; // Left Forwards
int IN2 = 8; // Left Backwards
int IN3 = 9; // Right Forwards
int IN4 = 11; // Right Backwards

// Light sensor pins
int LLpin = 2;
int MLpin = 4;
int RLpin = 10;

// Default data is to not be moving
struct MotorData {
  int PWMpin;   //Pin for pwm
  int Fpin;     //Pin to go forwards
  int Bpin;     //Pin to go backwards
  int power = 0;
} lm, rm;

//Global class to handle motor control
class MotorController {
public:
  MotorController(MotorData lm, MotorData rm){
    _rm.PWMpin = ENA;
    _lm.PWMpin = ENB;
  
    _lm.Fpin = IN1;
    _lm.Bpin = IN2;
    _rm.Fpin = IN4;
    _rm.Bpin = IN3;
    pinMode(IN1, OUTPUT);
    pinMode(IN2, OUTPUT);
    pinMode(IN3, OUTPUT);
    pinMode(IN4, OUTPUT);
    setLeftForwards();
    setRightForwards();
  }
private:
  MotorData _lm;
  MotorData _rm;
   
  void setLeftForwards() {
    digitalWrite(_lm.Bpin, LOW);
    digitalWrite(_lm.Fpin, HIGH);
  }
  void setRightForwards() {
    digitalWrite(_rm.Bpin, LOW);
    digitalWrite(_rm.Fpin, HIGH);
  }
} mc(lm, rm);

void TaskRunMotors(void *pvParameters) {
  (void) pvParameters;

  for (;;) // The REAL loop (kinda)
  {
    //mc.justMove();
    vTaskDelay(2);
  }
}

void TaskReadSerial(void *pvParameters) {
  (void) pvParameters;
  char command[12];

  for (;;) // The more real loop
  {
    //Test Serial response
    while(Serial.available()) {
      char c = Serial.read();
      Serial.println(c);
      switch(c){
        case 'f':
        digitalWrite(13, LOW);
        break;
        case 'n':
        digitalWrite(13, HIGH);
        break;
      }
    }    
    vTaskDelay(2);
  }
}
