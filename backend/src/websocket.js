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
            ws.send(JSON.stringify({
              'event': 'connectedserver',
              'serverid': id,
            }))
            ws.on('close', () => {
              masterClients.delete(id)
            })
          } else if (jsonData.type == 'controller') {
            if (masterClients.has(parseInt(jsonData.serverid))) {
              let id = controllerClients.size + 1
              let name

              let serverWS = masterClients.get(jsonData.serverid)
  
              if (jsonData.name != null) {
                name = jsonData.name
              } else {
                name = 'Player'+id
              }
  
              let controllerData = {
                serverid: jsonData.serverid,
                ws: ws,
                id: id,
                name: name
              }
  
              controllerClients.set(id, controllerData)
  
              console.log("Controller",controllerData.name,"has been opened.")

              serverWS.send(JSON.stringify({
                'event': 'connectedcontroller',
                'controllerid': parseInt(controllerData.id),
                'controllername': controllerData.name,
                'admin': jsonData.admin
              }))

              ws.send(JSON.stringify({
                'event': 'connected',
                'controllerid': parseInt(controllerData.id),
                'controllername': controllerData.name,
                'admin': jsonData.admin
              }))
              ws.on('close', () => {
                controllerClients.delete(id)
              })
            }
          }
        } else if (jsonData.action == 'event') {
          if (masterClients.has(parseInt(jsonData.serverid))) {
            if (jsonData.type == "answer-change") {
              if (jsonData.answer == 'A' || jsonData.answer == 'B' || jsonData.answer == 'C' || jsonData.answer == 'D' || jsonData.answer == 'unselect') {
                let _ws = masterClients.get(jsonData.serverid)
                _ws.send(String(jsonData.answer))
              }
            } else if (jsonData.type == "conffeti") {
              console.log(jsonData)
              let serverWS = masterClients.get(jsonData.serverid)
              serverWS.send('confetti')
            } else if (jsonData.type == "start") {
              console.log(jsonData)
              let serverWS = masterClients.get(jsonData.serverid)
              serverWS.send('start')
            }
          }
        }
      }

    });
  
    ws.send('Connected');
  });
}

export default { init }