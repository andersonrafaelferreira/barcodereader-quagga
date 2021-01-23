import {useEffect, useCallback} from 'react';

// import logo from './logo.svg';
import './App.css';

import Quagga from 'quagga';

import { Video } from './styles'

function App() {



  const detectado = useCallback((result) => {
    Quagga.offDetected(detectado);
    let code = result.codeResult.code;
    alert(code);
  }, []);

  useEffect(()=>{
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
      Quagga.init({
        inputStream : {
          name : "Live",
          type : "LiveStream",
          target: document.querySelector('#video')    // Or '#yourElement' (optional)
        },
        decoder : {
          readers : ["ean_reader"]
          // readers : ["code_128_reader"]
        }
      }, function(err) {
          if (err) {
              console.log(err);
              return
          }
          console.log("Initialization finished. Ready to start");
          Quagga.start();
      }, Quagga.onDetected(detectado));
      
    }
  },[detectado]);

  return (
    <Video id="video" />
  );
}

export default App;
