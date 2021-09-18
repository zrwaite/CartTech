import sys
import time
import serial
import numpy as np
import serial
import math


def slice_data(buf):
	if len(buf) < 42:
		raise sys.InputError("data too short")
	i = 0
	for enum, data in enumerate(buf):
		if data == 250:
			i = enum
			break
	return buf[i+42:], buf[i:i+42]

def read_data(buf):
	slice_list = []
#	i = 0
	while True:
		try:
			buf, data_slice = slice_data(buf)
			slice_list.append(data_slice)
#			print(i)
#			i += 1
		except Exception as e:
			break
	return slice_list

def parse_data_slice(buf):
	data_slice = []
	data_slice.append(str(buf[3]*256+buf[2]) + "rpm ")

	angle_offset = (buf[1]-160)*6
	for i in range(6):
		index_pos = 4 + i*6
		data_slice.append(str(angle_offset + i) 
			+ "°: " 
			+ str(buf[index_pos+3]*256 + buf[index_pos+4]) 
			+ "mm ")

	#degree = str(buf[1]) + "° "
	return "".join(data_slice)


def parse_data(buf):
	data_list = []
	for data_slice in buf:
		data_list.append(parse_data_slice(list(data_slice)))
	return data_list

def lidar_data(buf):
	with open('data.txt', 'w') as f:
		theta_list, r_list = [], []
		for packet in buf:
			angle_offset = (packet[1]-160)*6
			for i in range(6):
				index_pos = 4 + i*6
				theta = math.radians(int(angle_offset + i)) + math.pi
				distance = int(packet[index_pos+3] * 256 + packet[index_pos+2])
				section = 0.35
				if distance < 1500 and distance != 0 and (theta < 2*math.pi + section and theta > 2*math.pi - section):
					r_list.append(distance)
					theta_list.append(theta)

				#r_list.append(distance)
				for_string = ''
				for j in range(6):
					for_string += str(str(packet[index_pos+j]) + ' ')
				f.write(str(for_string + '\n'))
		return theta_list, r_list 

# Port for Lidar
ser = serial.Serial(
	port='/dev/ttyTHS1',
	baudrate=230400,
	#parity=serial.PARTIY_NONE,
	#stopbits=serial.STOPBITS_ONE,
	#bytesize=serial.EIGHTBITS,
	timeout=None
)

#Port for RPi
ser1 = serial.Serial(
	port='/dev/ttyUSB0',
	baudrate=9600,
	#parity=serial.PARTIY_NONE,
	stopbits=serial.STOPBITS_ONE,
	bytesize=serial.EIGHTBITS,
	timeout=None
)
# Begin Lidar
ser.write(str.encode('b'))

# Read data
while True:
    initTime = time.time()
    while(ser.inWaiting() < 1000):
        if(initTime - time.time() > 2):
            ser.write(str.encode('e'))
            print('trying again')
            ser.write(str.encode('b'))
            initTime = time.time()

    x = ser.read(min(ser.inWaiting(), 2000))

    data = read_data(x)
    theta_list, r_list = lidar_data(data)
    data_list = parse_data(data)

    # Calulate avg distance
    avg = 0
    if r_list:
        for t, r in zip(theta_list, r_list):
            avg += r*math.cos(t)
        avg /= len(r_list)

        # Decided when to stop and start

        if avg < 500:
            ser1.write(str.encode('s'))
        else:
            ser1.write(str.encode('g'))
        print(avg)