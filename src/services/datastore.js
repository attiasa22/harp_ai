import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
// Import the functions you need from the SDKs you need
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
const app = firebase.initializeApp(firebaseConfig);

const database = firebase.database();

export const getRoom = async (partyId, callback) => {
    database.ref('rooms').orderByChild("partyId").equalTo(partyId).on('value', (snapshot) => {
        const newRoomState = snapshot.val();
        console.log(Object.values(newRoomState)[0]['members']);
        if (newRoomState === null) {
          callback('');
        } else {
          callback(Object.values(newRoomState)[0]['members']);
        }
      });
}

export const createRoom = async (room) => {
    database.ref("rooms").push(room);
};

export const joinRoom = async () => {

};

export const deleteRoom = async (partyId, navigate) => {
    database.ref("rooms").orderByChild("partyId").equalTo(partyId).once("value", snapshot => {
        const updates = {};
        snapshot.forEach(child => updates[child.key] = null);
        database.ref("rooms").update(updates);
    });
    navigate("/");
};

export const leaveRoom = async () => {
    
};

export function updateEmotion(partyId, emotion) {
  if (checkEmotionExist(partyId, emotion)){
      //database.ref("rooms").child(partyId).child("emotion").child(emotion)
  }
  else{
      database.ref("rooms").ref(partyId).push(emotion)
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
  database.ref("rooms").child(partyId).orderByChild("emotion").equalTo(emotion).once("value", snapshot => {
      if (snapshot.exists()) {
          return true;
      } else {
          return false;
      }
  });
};