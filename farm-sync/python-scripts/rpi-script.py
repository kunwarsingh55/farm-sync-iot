import serial
import time
import json
import requests
import threading
import socketio

URL= 'http://localhost:3000/api/sensor-data'
sio = socketio.Client()
ser = serial.Serial(None)
PORT = "COM5"


@sio.event
def connect():
    print("Websocket Connected")

@sio.on('drip')
def on_message(data):
    print("Event Fired: DripState, - ", data)
    dripState(str(data))
    print(data)


def listenForDeviceChange(ser):
    try:
        sio.connect('http://localhost:3000')
    except:
        print("H")
    
    

def connectToArduino():
    connectedSerial = False
    ser.port = 'COM5'
    while not connectedSerial:
        try:
            ser.open()
            print(ser)
            connectedSerial = True
        except:
            print("Errr .. Retrying Serial Connect\n")
            time.sleep(2)
    print("Serial Online\n\n")
    time.sleep(3)
    


def sendJsonData(data):
    data = json.dumps(data)
    print("----------------", data)
    ser.write(data.encode('ascii'))
    ser.flush()
    rawLine = ser.readline()
    try:
        strLine = rawLine.decode()
        responseJson = json.loads(strLine)
        return responseJson
    except:
        return rawLine


def getSensorData():
    data = {}
    data["request"] = "sensor"
    rsp = sendJsonData(data)
    ser.flush()
    return rsp


def dripState(state):
    data = {}
    data["request"] = "device"
    data["device"] = "drip"
    data["state"] = state
    rsp = sendJsonData(data)
    return rsp


def sendDataRoutine():
    while True:
        sensorData = getSensorData()
        print(sensorData)
        response = requests.post(URL, json=sensorData)
        print("Data Sent, Status code: ", response.status_code , "\n\n")
        #print("Printing Entire Post Request")
        #print(response)
        time.sleep(5)





if __name__ == "__main__":

    connectToArduino()
   
    sendDataRoutine_thread = threading.Thread(target=sendDataRoutine, args=())
    sendDataRoutine_thread.start()

    listenForDeviceChange(ser)


            

    

