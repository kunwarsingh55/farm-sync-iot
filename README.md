# IoT System with Raspberry Pi

This is a simple IoT (Internet of Things) system built using a Raspberry Pi, various sensors (moisture, temperature, humidity), and actuators (water pump, drip system). The system consists of three main components: a Back-end server, a Front-end interface, and the Raspberry Pi IoT device.

<img src="/images/dashboard.gif" alt="Raspberry Pi" height="500">
<div style="display: flex; flex-direction: row;">
  <img src="/images/pi.gif" alt="Raspberry Pi" height="700" style="align-self: flex-start;">
  <img src="/images/farm.JPEG" alt="Raspberry Pi" width="400" style="align-self: flex-start;">
</div>




## Components

MERN + Python

### 1. Backend

- **Technology Stack**: Node.js, MongoDB
- **Description**: The backend server is responsible for collecting data from the Raspberry Pi, handling user input via WebSocket, and storing data in a MongoDB database.

### 2. Frontend

- **Technology Stack**: React.js
- **Description**: The frontend is a user interface built with React.js, using WebSocket connections to communicate with the backend. It displays real-time data and allows users to interact with the IoT system.

### 3. IoT Device (Raspberry Pi)

- **Technology Stack**: Python
- **Description**: The Raspberry Pi runs a Python script to communicate with the backend via HTTP POST requests and WebSockets. It collects data from various sensors and can trigger actuators based on user commands.

## Setup and Installation

To set up and run this IoT system locally, follow these steps:

1. **Backend Setup**: 
   - Clone this repository.
   - Navigate to the `server` directory.
   - Install the required Node.js packages by running `npm install`.
   - Start the backend server with `nodemon`.

2. **Frontend Setup**:
   - Navigate to the `client` directory.
   - Install the necessary dependencies with `npm install`.
   - Start the frontend with `npm start`.

3. **Raspberry Pi Setup**:
   - Set up your Raspberry Pi with Raspbian OS.
   - Clone this repository on your Pi.
   - Navigate to the `python-scripts` directory.
   - Run the `rpi-scripy-new` script on your Pi.
   - Also you have to interface all the sensors with GPIOs of pi
	   - you can also use 	Arduino to connect sensors and use serial communication between Pi and Arduino, code for this is in `rpi-script` in `python-scripts` directory


