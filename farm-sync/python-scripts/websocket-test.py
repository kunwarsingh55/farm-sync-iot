import asyncio
import websockets
 
async def test():
    try:
        async with websockets.connect('ws://localhost:5000/') as websocket:
            while True:
                await websocket.send("hlo frm python")
                response = await websocket.recv()
                print(response)
                #websocket.run_forever() 
    except:
        print("Errr")
 
# loop = asyncio.get_event_loop()
# loop.run_until_complete(test())
# loop.close() 

if __name__ == '__main__':
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    try:
        asyncio.run(test())
    except KeyboardInterrupt:
        pass