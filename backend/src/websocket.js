import { WebSocketServer } from 'ws';
let masterClient = null

function init(port = 8080) {
  const wss = new WebSocketServer({ keepAlive: true, port: port,  });
  
  wss.on('connection', function connection(ws) {
    
    ws.on('message', function message(data) {
      if (data == 'ping') {
        ws.send('pong');
      } else if (data == 'Im The MASTER!' && masterClient == null) {
        masterClient = ws
      } 
      
      
      else {
        console.log('received: %s', data);
      }
    });
  
    ws.send('Connected');
  });
}

export default { init }