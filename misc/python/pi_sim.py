import time 
import socketio
import random
import requests
import sys
from colorama import Fore, Back, Style, init
import os

URL= 'http://localhost:3000/sensorData'
sio = socketio.Client()

@sio.on('device')
def on_message(data):
    message = 'Device Change :' + str(data)
    print(Fore.YELLOW + message)
    

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
            sio.connect('http://localhost:3000', transports=['websocket'])
            connect = True
        except Exception as e:
            print('Socket Connection Error : ', e)
            connect = False
            continue
    time.sleep(1)

    sensor_data, message = send_data_post(moisture_sensor(), temperature_sensor(), humidity_sensor())

    time.sleep(3)

    print(Fore.GREEN +  message)
    
    