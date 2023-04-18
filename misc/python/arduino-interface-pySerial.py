import serial
import time
import json


ser = serial.Serial('COM5')  
time.sleep(1)


def sendJsonData(data):
    data=json.dumps(data)
    ser.write(data.encode('ascii'))
    ser.flush()
    rawLine = ser.readline()   
    strLine = rawLine.decode() 
    responseJson = json.loads(strLine)
    return responseJson 

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
    

    
while True:
    time.sleep(2) 
    print(getSensorData())
    time.sleep(2) 
    print(dripState("on"))
    time.sleep(2) 
    print(dripState("off"))
    time.sleep(2) 
    print(dripState("on"))




   
    
#{'message': '{"request": "sensor"}'} 