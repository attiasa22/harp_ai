

import React, { Component } from "react";
import MicRecorder from 'mic-recorder-to-mp3';
import axios from 'axios';
import newError from 'react';
import speech_to_text_key from '../config.js';
import nlu_key from '../config.js';

import * as fs from 'fs';
const Mp3Recorder = new MicRecorder({ bitRate: 128 });

//var recognizeMic = require('watson-speech/speech-to-text/recognize-microphone');
export default class Audio extends Component {
  constructor(props) {
    super(props);

    /*
     * declare states that will enable and disable
     * buttons that controls the audio widget
     */
    this.state = {
        isRecording: false,
        blobURL: '',
        isBlocked: false,
        isRecordingStp: false,
        text: '',
        sentiment:'',
        setRecordingEmotions: props.setRecordingEmotions,
      }

    //binds the methods to the component
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.reset = this.reset.bind(this);
   }

  componentDidMount(){
    //const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
    //const { IamAuthenticator } = require('ibm-watson/auth');


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
    Mp3Recorder
      .stop()
      .getMp3()
      .then(async ([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob);
        this.setState({ blobURL, isRecording: false });
        this.setState({ isRecordingStp: true });
        const file = new File(buffer, 'recording.mp3', {
          type: blob.type,
          lastModified: Date.now()
        });
        /*
        let data = new FormData();
        data.append('wavfile', myWav, 'recording.wav');
        */

        let formData = new FormData();
        formData.append("audio", file);
        const response = await axios.post(`http://localhost:1880/test`, formData);
        console.log(response.data.emotion.document.emotion);
        this.state.setRecordingEmotions(response.data.emotion.document.emotion);
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

    //display view of audio widget and control buttons
    return(
      <div className="mic-stuff">
        <button className="btn btn-light" onClick={this.start} disabled={this.state.isRecording}>Record</button>
        <button className="btn btn-danger" onClick={this.stop} disabled={!this.state.isRecording}>Stop</button>
        <button className="btn btn-warning" onClick={this.reset} disabled={!this.state.isRecordingStp}>Reset</button>
        <audio src={this.state.blobURL} controls="controls" />
      </div>
    );
  }
}