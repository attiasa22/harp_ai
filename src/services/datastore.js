import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA765RoPk0ObQbeN4JegQ2kcBQPXBfNufM",
  authDomain: "harp-ai.firebaseapp.com",
  projectId: "harp-ai",
  storageBucket: "harp-ai.appspot.com",
  messagingSenderId: "123448523556",
  appId: "1:123448523556:web:6b6829d597ba26664051b1",
  measurementId: "G-6CSX1FERSM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//export const auth = getAuth(app);

const database = firebase.database();

export const checkExist = async (partyId) => {
    database.ref("rooms").orderByChild("partyId").equalTo(partyId).once("value", snapshot => {
        if (snapshot.exists()) {
            return true;
        } else {
            return false;
        }
    });
};

export const createRoom = async (partyId) => {
    database.ref("rooms").push(partyId, 1);
};

export const joinRoom = async () => {

};

export const leaveRoom = async () => {

};

export function updateEmotion(partyId, emotion) {
    if (checkEmotionExist(partyId, emotion)){
        database.ref("rooms").ref(partyId).child("emotion").child(emotion).set(database.ServerValue.increment(1))
    }
    else{
        database.ref("rooms").ref(partyId).child("emotion").child(emotion).set(1)
    }
};

export function getEmotion(partyId,callback) {
        // do something here
        database.ref("rooms").ref(partyId).on('emotion', (snapshot) => {
          const newEmotionState = snapshot.val();
          if (newEmotionState === null) {
            callback([]);
          } else {
            callback(newEmotionState);
          }
        })
};

export const checkEmotionExist = async (partyId, emotion) => {
    database.ref("rooms").ref(partyId).orderByChild("emotion").equalTo(emotion).once("value", snapshot => {
        if (snapshot.exists()) {
            return true;
        } else {
            return false;
        }
    });
};