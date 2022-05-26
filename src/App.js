// Audio: https://wecode101.com/audio-recoding-and-playback-in-react-js

import React, { Component } from 'react';
import Audio from "./components/audio.component";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
} from 'react-router-dom';
import './App.css';
import Home from './components/home';
import JoinParty from './components/joinParty';
import PartyAdmin from './components/partyAdmin';

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {

      isRecording: false,

      blobURL: '',

      isBlocked: false,

      isRecordingStp: false,

    };

    // this.start = this.start.bind(this); //this makes the website blank for some reason

    // this.stop = this.stop.bind(this);

    // this.reset = this.reset.bind(this);

  }

  componentDidMount(){

    //Prompt the user for permission to allow audio device in browser

    navigator.getUserMedia = (

      navigator.getUserMedia ||

      navigator.webkitGetUserMedia ||

      navigator.mozGetUserMedia ||

      navigator.msGetUserMedia

    );

       //Detects the action on user click to allow or deny permission of audio device

       navigator.getUserMedia({ audio: true },

        () => {
  
          console.log('Permission Granted');
  
          this.setState({ isBlocked: false });
  
        },
  
        () => {
  
          console.log('Permission Denied');
  
          this.setState({ isBlocked: true })
  
        },
  
      );
  
    }

    start(){

      /*  
  
       * If the user denys permission to use the audio device
  
       * in the browser no recording can be done and an alert is shown
  
       * If the user allows permission the recoding will begin
  
       */
  
      if (this.state.isBlocked) {
  
        alert('Permission Denied');
  
      } else {
  
        Mp3Recorder
  
          .start()
  
          .then(() => {
  
            this.setState({ isRecording: true });
  
          }).catch((e) => console.error(e));
  
      }
  
    }

    stop() {

      /*
 
      * Once the recoding starts the stop button is activated
 
      * Click stop once recording as finished  
 
      * An MP3 is generated for the user to download the audio
 
      */
 
     Mp3Recorder
 
       .stop()
 
       .getMp3()
 
       .then(([buffer, blob]) => {
 
         const blobURL = URL.createObjectURL(blob)
 
         this.setState({ blobURL, isRecording: false });
 
         this.setState({ isRecordingStp: true });
 
       }).catch((e) => console.log(e));
 
   };

   reset() {

    /*    

     * The user can reset the audio recording  

     * once the stop button is clicked    

     */

    document.getElementsByTagName('audio')[0].src = '';

    this.setState({ isRecordingStp: false });

};

  render() {
    return (
      <BrowserRouter>
        <div>
          <div className="nav">
            <NavLink to="/" className="home-link"><p className="nav-title">HarpAI</p></NavLink>
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/joinParty" element={<JoinParty />} />
            <Route path="/partyAdmin" element={<PartyAdmin />} />
            <Route path="*" element={<div>post not found </div>} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
