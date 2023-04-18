
import time
import json
import requests
import threading
import random

URL= 'http://localhost:3000/api/sensor-data'


PORT = "COM5"


def sendDataRoutine():
    while True:
        sensorData = {}
        sensorData["temperature"] = random.randint(20, 30)
        sensorData["moisture"] = random.randint(20, 30)
        sensorData["humidity"] = random.randint(20, 30)
        response = requests.post(URL, json=sensorData)
        print("Data Sent, Status code: ", response.status_code , "\n\n")
        #print("Printing Entire Post Request")
        #print(response)
        time.sleep(5)



if __name__ == "__main__":
    sendDataRoutine_thread = threading.Thread(target=sendDataRoutine, args=())
    sendDataRoutine_thread.start()





            

    

