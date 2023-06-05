import OBSWebSocket from 'obs-websocket-js';
function sleep(ms){return new Promise((resolve)=>{setTimeout(resolve, ms);});}

async function init() {
  const obs = new OBSWebSocket();
  var obsConnected = false;

  // Declare some events to listen for.
  obs.on('ConnectionOpened', () => {
    console.log('Connection Opened');
  });

  obs.on('Identified', () => {
    console.log('Identified, good to go!')

    // Send some requests.
    obs.call('GetSceneList').then((data) => {
      console.log('Scenes:', data);
    });
  });

  obs.on('SwitchScenes', data => {
    console.log('SwitchScenes', data);
  });


  while (obsConnected == false) {
    obs.connect('ws://localhost:4455', 'T533ITvF5PxHIJAR').then((info) => {
      console.log('Connected and identified', info)
      obsConnected = true
    }, () => {
      console.error('Error Connecting to OBS')
      obsConnected = false
    });
    await sleep(10000)
  }
}

export default { init }