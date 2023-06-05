import { WebSocketServer } from 'ws';
let masterClients = new Map();
let controllerClients = new Map();

function init(port = 8080) {
  const wss = new WebSocketServer({ keepAlive: true, port: port,  });
  
  wss.on('connection', function connection(ws) {
    
    ws.on('message', function message(data) {
      if (data == 'ping') {
        ws.send('pong');
      } else if (data == 'Im The MASTER!') {
        let id = Date.now()
        masterClients.set(id, ws)
        console.log("Master",id,"has been opened.")
        ws.on('close', () => {
          console.log("Master",id,"has been closed.")
          masterClients.delete(id)
        })
      } else if (data == 'Im a controller') {
        let id = Date.now()
        controllerClients.set(id, ws)
        console.log("Controller",id,"has been opened.")
        ws.on('close', () => {
          console.log("Controller",id,"has been closed.")
          controllerClients.delete(id)
        })
      }
      
      if (data == 'A' || data == 'B' || data == 'C' || data == 'D' || data == 'unselect') {
        masterClients.forEach(element => {
          element.send(String(data))
        });
      }
    });
  
    ws.send('Connected');
  });
}

export default { init }