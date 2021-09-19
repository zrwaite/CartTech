#include <Arduino_FreeRTOS.h>
#include <Wire.h>
#include <MPU6050.h>

MPU6050 mpu;
unsigned long timer = 0;

float pitch = 0;
float roll = 0;
long yaw = 0;

Vector norm;

bool gyroInitialized = false;

void TaskRunMotors( void *pvParameters );
void TaskReadSerial( void *pvParameters );

Vector rg;
float ZAvg = 0;

float calibrationMillis;

void calibrate(){
  timer = millis();
  float sumZ = 0;
  for (uint8_t i = 0; i < 100; ++i) {
    rg = mpu.readRawGyro();
    sumZ += rg.ZAxis;
    delay(50);
  }
  calibrationMillis = millis() - timer - 50;
  Serial.print(calibrationMillis);
  Serial.print(" ");
  Serial.print(sumZ);
  Serial.print(" ");
  Serial.print(timer);
  ZAvg = sumZ / calibrationMillis;
  Serial.print(" ");
  Serial.print(sumZ / calibrationMillis);
  Serial.print(" ");
  Serial.println(ZAvg);
}

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  
  while (!Serial) {;}
  
  pinMode(13, OUTPUT);

  // Initialize MPU6050
  while(!mpu.begin(MPU6050_SCALE_2000DPS, MPU6050_RANGE_2G))
  {
    Serial.println("Could not find a valid MPU6050 sensor, check wiring!");
    delay(500);
  }
  Serial.println("Gyro done");
  calibrate();

  // Set threshold sensivty. Default 3.
  // If you don't want use threshold, comment this line or set 0.
  mpu.setThreshold(3);

  Serial.println("Gyro done");

  // initialize timer1 
  noInterrupts();           // disable all interrupts
  TCCR1A = 0;
  TCCR1B = 0;
  TCNT1  = 0;

  OCR1A = 31250;            // compare match register 16MHz/256/2Hz
  TCCR1B |= (1 << WGM12);   // CTC mode
  TCCR1B |= (1 << CS12);    // 256 prescaler 
  TIMSK1 |= (1 << OCIE1A);  // enable timer compare interrupt
  interrupts();             // enable all interrupts

  Serial.println("created");

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

    gyroInitialized = true;
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

  void motorsMove(){
    drive();
  }

  void motorsSpeed(int power){
    //Serial.println(power);
    if(power < 0){
      power *= -1;
      setLeftBackwards();
      setRightBackwards();
      //Serial.println(power);
    } else {
      setLeftForwards();
      setRightForwards();
    }
    _lm.power = power;
    _rm.power = power;
  }

  void checkBlink(){
    if(_blink){
      _blink = false;
      digitalWrite(13, HIGH);
    } else {
      _blink = true;
      digitalWrite(13, LOW);
    }
  }

  void lineFollow(){
    _lineFollow = true;
  }

  void lineFollow(bool state){
    _lineFollow = state;
  }

  bool getFollowState(){
    return _lineFollow;
  }

  void turn(int turnDirection, int power, int cycles){
    lineFollow(false);
    _cyclesLimit = cycles;
    _turn = true;
    _turnDirection = turnDirection;
    _yawGoal = _yaw - (44000 * turnDirection);
    //Serial.println(_yaw);
    if(turnDirection == 1){
      setRightBackwards();
      setLeftForwards();
    } else {
      setLeftBackwards();
      setRightForwards();
    }
    _lm.power = power;
    _rm.power = power;
  }

  void stopTurn(){
    _turn = false;
    setLeftForwards();
    setRightForwards();
  }

  void setYaw(long yaw) {
    _yaw = yaw;
  }
  
private:
  MotorData _lm;
  MotorData _rm;

  bool _blink = false;
  bool _lineFollow = false;
  bool _turn = false;
  int _turnDirection = 1; //1 turns right, -1 turns left
  int _turnCycles = 0;
  int _cyclesLimit = 20;
  long _yaw = 0;
  long _yawGoal = 0;

  void drive(){
    int l_offset = 0;
    int r_offset = 0;
    if(_lm.power != 0 && _rm.power != 0){
      if(_lineFollow){
        if(digitalRead(MLpin)){
          l_offset = 40;
          r_offset = -40;
        } else {
          l_offset = -60;
          r_offset = 90;
        }
      } else if(_turn) {
        l_offset = _lm.power * ((_turnDirection == -1) ? 0.5 : -0.8);
        r_offset = _rm.power * ((_turnDirection == 1) ? 0.5 : -0.8);
        if(_turnDirection == 1 && _yaw < _yawGoal ) {
          stopTurn();
          motorsSpeed(0);
        } else if (_turnDirection == -1 && _yaw > _yawGoal){
          stopTurn();
          motorsSpeed(0);
        }
        //Serial.print(_yaw);
        //Serial.print(" ");
        //Serial.println(_yawGoal);
      }
    }

    if(!digitalRead(RLpin) && _lm.power != 0){
      Serial.print('z');
    }
    
    analogWrite(_lm.PWMpin, _lm.power + l_offset);
    analogWrite(_rm.PWMpin, _rm.power + r_offset);
  }
  
  void setLeftForwards() {
    digitalWrite(_lm.Bpin, LOW);
    digitalWrite(_lm.Fpin, HIGH);
  }
  void setRightForwards() {
    digitalWrite(_rm.Bpin, LOW);
    digitalWrite(_rm.Fpin, HIGH);
  }
  void setLeftBackwards() {
    digitalWrite(_lm.Fpin, LOW);
    digitalWrite(_lm.Bpin, HIGH);
  };
  void setRightBackwards() {
    digitalWrite(_rm.Fpin, LOW);
    digitalWrite(_rm.Bpin, HIGH);
  };
} mc(lm, rm);

ISR(TIMER1_COMPA_vect) {
  if(gyroInitialized){
    digitalWrite(13, digitalRead(13) ^ 1); 
  }
}

void TaskRunMotors(void *pvParameters) {
  (void) pvParameters;
  timer = millis();
  for (;;) // The REAL loop (kinda)
  {
    
    if(gyroInitialized){
      norm = mpu.readRawGyro();
      yaw += (norm.ZAxis - (millis() - timer) * ZAvg);
      mc.setYaw(yaw);  
    }
    
    mc.motorsMove();
    
    timer = millis();
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
      char dir;
      char c = Serial.read();
      //Serial.println(c);

      switch(c){
        case 'f':
        digitalWrite(13, LOW);
        break;
        case 'n':
        digitalWrite(13, HIGH);
        break;
        case 'g':
        mc.motorsSpeed(160);
        mc.checkBlink();
        break;
        case 's':
        //Serial.println("3\n");
        mc.motorsSpeed(0);
        mc.checkBlink();
        break;
        case 'l':
        mc.lineFollow();
        break;
        case 't':
        dir = Serial.read();
        if(dir == 'r'){
          mc.turn(1, 160, 60);
        } else if(dir == 'l') {
          mc.turn(-1, 160, 40);
        }
        break;
        
        case 'b':
        //Serial.println("1\n");
        mc.motorsSpeed(-160);
        mc.checkBlink();
        break;

        case 'q':
        Serial.println("2\n");
        mc.stopTurn();
        break;
      }
    }
      
    vTaskDelay(2);
  }
}
