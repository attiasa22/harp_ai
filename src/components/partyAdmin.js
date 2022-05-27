import React, { Component } from 'react';
import Audio from './audio.component';
import MicRecorder from 'mic-recorder-to-mp3';
const Mp3Recorder = new MicRecorder({ bitRate: 128 });

class PartyAdmin extends Component {
    constructor(props) {
      super(props);
  
      this.state = {};
    }

    render() {
        return (
            <div className="home-page">
                <h1 id="main-title">Your Party</h1>
                <h2>Participants:</h2>
                <Audio/>
            </div>
        );
    }
}

export default PartyAdmin;
