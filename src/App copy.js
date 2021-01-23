import {useEffect} from 'react';

// import logo from './logo.svg';
import './App.css';

import Quagga from 'quagga';

import { Video } from './styles'

function App() {

  const detectado = result => {
    Quagga.offDetected(detectado);
    let code = result.codeResult.code;
    console.log(code);
  }

  useEffect(()=>{
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
      
      Quagga.init({
        inputStream:{
          name: 'Live',
          type: 'LiveStream',
          target: document.querySelector('#video'),
          constraints:{
            facingMode: 'envoironment',
          },
        },
        numOfWorkers: 1,
        locate: true,
        decoder:{
          readers: ['ean_reader'],
        },
      },
        err => {
          if(err){
            console.log(err);
            alert('deu erro');
            return;
          }
          Quagga.start();
        });
      Quagga.onDetected(detectado);

    }
  },[detectado]);

  return (
    <Video id="video" />
  );
}

export default App;
