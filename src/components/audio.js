

import React, { Component } from "react";
import MicRecorder from 'mic-recorder-to-mp3';
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
     /*
     * Once the recoding starts the stop button is activated
     * Click stop once recording as finished
     * An MP3 is generated for the user to download the audio
     */
     const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
     const { IamAuthenticator } = require('ibm-watson/auth');
     

    Mp3Recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob)
        this.setState({ blobURL, isRecording: false });
        this.setState({ isRecordingStp: true });

        console.log(buffer, blob, blobURL);
        const tunnel = require('tunnel');
        const httpsAgent = tunnel.httpsOverHttp({
          proxy: {
            host: 'http://localhost:3000/',
            port: 3000,
          },
        });
          const speechToText = new SpeechToTextV1({
            authenticator: new IamAuthenticator({ apikey: 'o0t2ek7SVUxj3V2gRYWlcWqbAWAOlfkBEBt6fobws45a' }),  
            serviceUrl: 'https://api.us-south.speech-to-text.watson.cloud.ibm.com',
           // disableSslVerification: true,
  
            httpsAgent, // not necessary if using Basic or BearerToken authentication
             proxy: false,
             headers: {
              'Access-Control-Allow-Origin': 'http://localhost:3000'
             },
          });
          const file = new File(buffer, './recording.mp3', {
            type: blob.type,
            lastModified: Date.now()
          });
          const params = {
            // From file
            audio: new Audio('./recording.mp3'),
            contentType: 'audio/mp3;'
            
          };
          console.log("test");
          speechToText.recognize(params)
            .then(response => {
              console.log(JSON.stringify(response.result, null, 2));
              this.setState({ text: JSON.stringify(response.result, null, 2) });
            })
            .catch(err => {
              console.log(err);
            });


            const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
            
            const nlu = new NaturalLanguageUnderstandingV1({
              authenticator: new IamAuthenticator({ apikey: 'duALIFSm76eWlghDLNXsGWYifaJQGxMRnf' }),
              version: '2018-04-05',
              serviceUrl: 'https://api.us-south.natural-language-understanding.watson.cloud.ibm.com',
              httpsAgent, // not necessary if using Basic or BearerToken authentication
              proxy: false,
              headers: {
                'Access-Control-Allow-Origin': 'http://localhost:3000'
              },
            });
            
            nlu.analyze(
              {
                text: this.state.text, // Buffer or String
                features: {
                    emotion: {},
                }
              })
              .then(response => {
                console.log(JSON.stringify(response.result, null, 2));
                this.setState({ sentiment: JSON.stringify(response.result, null, 2) });

              })
              .catch(err => {
                console.log('error: ', err);
              });

    
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