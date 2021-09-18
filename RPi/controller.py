import time
import serial

# Serial to write to Arudino
ser = serial.Serial(
    port='/dev/ttyS0',
    baudrate = 9600,
    parity=serial.PARITY_NONE,
    stopbits=serial.STOPBITS_ONE,
    bytesize=serial.EIGHTBITS,
    timeout=None
)

# Serial to read from Jetson
ser1 = serial.Serial(
    port='/dev/ttyUSB0',
    baudrate = 9600,
    parity=serial.PARITY_NONE,
    stopbits=serial.STOPBITS_ONE,
    bytesize=serial.EIGHTBITS,
    timeout=None
)

#Just echo from Jetson to Arduino
while True:
    if(ser1.inWaiting() > 0):
        c = ser1.read()
        ser.write(c)
        print(c)
    time.sleep(1)