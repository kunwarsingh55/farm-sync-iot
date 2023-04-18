import websocket
import _thread
import time
import rel
from time import sleep

def on_message(ws, message):
    print(message)

def on_error(ws, error):
    print(error)

def on_close(ws, close_status_code, close_msg):
    print("### closed ###")

def on_open(ws):
    print("Opened connection")

if __name__ == "__main__":
    websocket.enableTrace(True)
    ws = websocket.WebSocketApp("ws://localhost:5000/",
                              on_open=on_open,
                              on_message=on_message,
                              on_error=on_error,
                              on_close=on_close)
    
    ws.run_forever(dispatcher=rel, reconnect=5)  # Set dispatcher to automatic reconnection, 5 second reconnect delay if connection closed unexpectedly
    rel.signal(2, rel.abort)  # Keyboard Interrupt
    print("Sending 'Hello, World'...")
    sleep(5)
    ws.send("Hello, World")
    rel.dispatch()
    ws.send("Hello, World")


# import asyncio
# import websockets
 
# async def test():
#     async with websockets.connect('ws://localhost:5000/') as websocket:
#         while True:
#             await websocket.send("hello")
#             response = await websocket.recv()
#             print(response)
#             #websocket.run_forever() 
 
# # loop = asyncio.get_event_loop()
# # loop.run_until_complete(test())
# # loop.close() 

# if __name__ == '__main__':
#     loop = asyncio.new_event_loop()
#     asyncio.set_event_loop(loop)
#     try:
#         asyncio.run(test())
#     except KeyboardInterrupt:
#         pass