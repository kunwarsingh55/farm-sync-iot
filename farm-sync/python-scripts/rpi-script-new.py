import time 
import socketio
import random
import requests
import sys
from colorama import Fore, Back, Style, init
import os

from luma.core.interface.serial import i2c, spi, pcf8574
from luma.core.interface.parallel import bitbang_6800
from luma.core.render import canvas
from luma.oled.device import ssd1306, ssd1309, ssd1325, ssd1331, sh1106, sh1107, ws0010
import subprocess
from PIL import Image, ImageDraw, ImageFont




URL= 'http://192.168.1.38:3000/sensorData'
sio = socketio.Client()

serial = i2c(port=1, address=0x3C)

# substitute ssd1331(...) or sh1106(...) below if using that device
device = sh1106(serial)
font = ImageFont.truetype('PixelOperator.ttf', 16)
# Display Refresh
LOOPTIME = 1.0

@sio.on('device')
def on_message(data):
    drip = "OFF"
    pump = "OFF"
    message = 'Device Change :' + str(data)
    if data['name']=='Drip System':
        drip = data['state']
    if data['name']=="Water Pump":
        pump = data['state']
    with canvas(device) as draw:
        draw.text((0, 0), "Drip : " + drip , font=font, fill=255)
        draw.text((0, 16), "Pump : " + pump, font=font, fill=255)
    time.sleep(2)
    print(Fore.YELLOW + message)
    
    
        
    
# simulating sensor values for now
def moisture_sensor():
    random_integer = random.randint(0, 100)
    moisture_value = (12 + 34 + 22 + random_integer)/4
    return moisture_value

def temperature_sensor():
    random_integer = random.randint(0, 100)
    temperature_value = (18 + 14 + 12 + random_integer)/4
    return temperature_value

def humidity_sensor():
    humidity_integer = random.randint(0, 100)
    humidity_value = (52 + 24 + 72 +  humidity_integer)/4
    return  humidity_value

def send_sensor_data_socket(connection ,moisture, temperature, humidity):  
    connection.emit('sensordata', {'data': { 'moisture' :  moisture, 'temperature': temperature, 'humidity' : humidity}})
    time.sleep(2)

def send_data_post(moisture, temperature, humidity):
    sensorData = {'moisture' :  moisture, 'temperature': temperature, 'humidity' : humidity}
    try:
        response = requests.post(URL, json=sensorData)
    except Exception as e:
        return sensorData, 'POST /sensorData 404, retrying ...'
    return sensorData, 'POST /sensorData OK'

def clear_console():
    os.system('cls' if os.name == 'nt' else 'clear')

connect = False
init(autoreset=True)  

while True:    
    if connect == False:
        try:
            sio.connect('http://192.168.1.38:3000', transports=['websocket'])
            connect = True
            
                
        except Exception as e:
            print('Socket Connection Error : ', e)
            connect = False
            
    time.sleep(1)

    sensor_data, message = send_data_post(moisture_sensor(), temperature_sensor(), humidity_sensor())

    time.sleep(3)
    
    
    with canvas(device) as draw:
        draw.text((0, 0),  message, font=font, fill=255)
        draw.text((0, 16), "Socket Connected", font=font, fill=255)
        
        

    print(Fore.GREEN +  message)
    
    
