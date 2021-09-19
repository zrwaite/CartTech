from time import perf_counter
import time
import serial
import RPi.GPIO as GPIO 

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

GPIO.setmode(GPIO.BCM)   
GPIO.setup(17, GPIO.OUT, initial=GPIO.LOW)

pickup_list = [True, True, True, True]
pickup_num = [4, 4, 4, 4]

def write_arduino(out):
    print('writing: ' + out)
    ser.write(str.encode(out))

def move_back(back_counter):
    if (back_counter + 5) % 5 == 0:
        write_arduino('b')
    elif (back_counter + 4) % 5 == 0:
        write_arduino('s')
    back_counter += 1
    return back_counter

def move_forward(for_counter):
    if (for_counter + 5) % 5 == 0:
        write_arduino('g')
    elif (for_counter + 4) % 5 == 0:
        write_arduino('s')
    for_counter += 1
    return for_counter

def begin_move():
    write_arduino('lg')
    write_arduino('l')

def check_black():
    print("checking black", ser.inWaiting())
    while ser.inWaiting():
        c = ser1.read(ser.inWaiting())
        d = c[len(c)-5:len(c)-1].decode('utf-8')
        print(d)
        for x in d:
            if x == 'z':
                return True
    return False

def blink(num):
    for i in range(num):
        GPIO.output(17, GPIO.HIGH) 
        time.sleep(0.5)                  
        GPIO.output(17, GPIO.LOW)  
        time.sleep(0.5)

stopped = False
turned = False
turned2 = False
turned3 = False
turn_done = True
back_counter = 0
for_counter = 0    
blinks = 0

def check_led(blinks):
    print('checking led', blinks, perf_counter() - led_t)
    if(blinks == 0 and perf_counter() - led_t > 1.5):
        if(pickup_list[blinks]):
            write_arduino('s')
            blink(pickup_num[blinks])
            begin_move()
        blinks += 1
        print('returning: ', blinks)
    elif(blinks == 1 and perf_counter() - led_t > 7):
        if(pickup_list[blinks]):
            write_arduino('s')
            blink(pickup_num[blinks])
            begin_move()
        blinks += 1
    elif(blinks == 2 and led_t2 != 0 and perf_counter() - led_t2 > 1.5):
        if(pickup_list[blinks]):
            write_arduino('s')
            blink(pickup_num[blinks])
            begin_move()
        blinks += 1
    elif(blinks == 3 and led_t2 != 0 and perf_counter() - led_t2 > 7):
        if(pickup_list[blinks]):
            write_arduino('s')
            blink(pickup_num[blinks])
            begin_move()
        blinks += 1
    return blinks

while(ser.inWaiting()):
    c = ser.read()
blink(4)
begin_move()
ser1.write(str.encode('r'))
led_t = perf_counter()
led_t2 = 0
blinks = 0
while True:
    blinks = check_led(blinks)
    if(ser1.inWaiting() > 0):
        c = ser1.readline()
        d = c.decode()
        inp = d[0]
        if(inp):
            if(stopped and inp == 's'):
                print('passing')
            elif(not stopped):
                t = perf_counter()
                write_arduino(inp)

            print(stopped, inp)
            
            if(not stopped and inp == 's'):
                stopped = True
            elif(stopped and not turned):
                print(d[1:4])
                if(perf_counter() - t < 3 and not turned):
                    if(int(d[1:4]) < 300):
                        back_counter = move_back(back_counter)
                    elif(int(d[1:4]) > 380):
                        for_counter = move_forward(for_counter)
                    elif(int(d[1:4]) > 300 and int(d[1:4]) < 380):
                        write_arduino('s')
                else:
                    if not turned:
                        write_arduino('tr')
                        time.sleep(3.5)
                        turned = True
                        stopped = False
                        begin_move()
                        t = perf_counter()
            elif(turned and stopped):
                print(d[1:4], 'stopping distance')
                write_arduino('s')
                if(not turned2):
                    print('timer started')
                    t = perf_counter()
                    turned2 = True
                if(perf_counter() - t > 3 and not turned3):
                    write_arduino('tr')
                    time.sleep(3.5)
                    turned3 = True
                    stopped = False
                    led_t2 = perf_counter()
                    begin_move()

        if not turned:
            ser1.write(str.encode('r'))
        elif turned:
            ser1.write(str.encode('l'))
    time.sleep(0.25)