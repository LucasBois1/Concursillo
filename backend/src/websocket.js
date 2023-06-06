import { WebSocketServer } from 'ws';

let masterClients = new Map();
let controllerClients = new Map();

function isJson(str) {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}

function init(port = 8080) {
  const wss = new WebSocketServer({ keepAlive: true, port: port,  });
  
  wss.on('connection', function connection(ws) {
    
    ws.on('message', function message(data) {
      // Keep Alive
      if (data == 'ping') {
        ws.send('pong');
      } 
      
      // Connection Storage
      else if (isJson(data)) {
        let jsonData = JSON.parse(data)
        if (jsonData.action == 'connection') {
          if (jsonData.type == 'master') {
            let id = masterClients.size + 1
            masterClients.set(id, ws)
            console.log("Master",id,"has been opened.")
            ws.send(id)
            ws.on('close', () => {
              masterClients.delete(id)
            })
          } else if (jsonData.type == 'controller') {
            let id = controllerClients.size + 1
            controllerClients.set(id, ws)
            console.log("Controller",id,"has been opened.")
            ws.send(id)
            ws.on('close', () => {
              controllerClients.delete(id)
            })
          }
        } else if (jsonData.action == 'event') {
          if (jsonData.type == "answer-change") {
            if (jsonData.answer == 'A' || jsonData.answer == 'B' || jsonData.answer == 'C' || jsonData.answer == 'D' || jsonData.answer == 'unselect') {
              masterClients.forEach(ws => {
                ws.send(String(jsonData.answer))
              });
            }
          } else if (jsonData.type == "conffeti") {
            masterClients.forEach(element => {
              element.send(String(data))
            });
          }
        }
      }

    });
  
    ws.send('Connected');
  });
}

export default { init }