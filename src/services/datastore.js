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
    database.ref('rooms/'+partyId).on('value', (snapshot) => {
        const newRoomState = snapshot.val();
       // console.log(newRoomState)
        //console.log(Object.values(newRoomState)['members']);
        if (newRoomState === null) {
          callback('');
        } else {
          callback(Object.values(newRoomState)['members']);//[0]
        }
      });
}

export const createRoom = async (room) => {
    database.ref("rooms").set(room);
    
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

    database.ref("rooms").child(partyId).remove();
};

export const leaveRoom = async () => {
    
};

export function getnormalisedEmotion(partyId) {
      var emotionsList = [];
      var ref = database.ref('/rooms/'+partyId+"/emotion");

      ref.once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          const childKey = childSnapshot.key;
          var childData = 1.0*childSnapshot.val();
          emotionsList[childKey] = childData
        });
      });
      const magnitude = sum(emotionsList);

      for (const [key, value] of Object.entries(emotionsList)) {
        if (magnitude == 0) {
          emotionsList[key] = 0;
        }
        else {
        emotionsList[key]= value/ magnitude
        }
      };
      console.log(emotionsList);
      return emotionsList;
};

function sum( obj ) {
  var sum = 0.0;
  for( var el in obj ) {
    if( obj.hasOwnProperty( el ) ) {
      sum += parseFloat( obj[el] );
    }
  }
  return sum;
};



export const updateEmotion = async (partyId, emotion) => {

  var ref = database.ref('rooms/'+partyId +"/emotion/"+emotion);
//  console.log(ref)
  ref.once('value', (snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
       // console.log("exists!", userData);
      
        database.ref('rooms/'+partyId+"/emotion/").update({[emotion]:parseInt(userData)+1});

    
      }
      else{
       // console.log("doesn't exist!");
       // console.log(partyId+"/emotion/"+emotion);
        database.ref('rooms/'+partyId+"/emotion/"+emotion).set(1);
      }
  });
  getnormalisedEmotion(partyId)
};


export function setEmotionstoZero(partyId) {
  var ref = database.ref('/rooms/'+partyId+"/emotion");

  ref.once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      ref.update({[childSnapshot.key]:0.0});
    });
  });
  getnormalisedEmotion(partyId)
};

export function getSpotifyISRC(json){
  for(var i = 0; i < json.length; i++) {
    var obj = json[i];
    console.log(obj.isrc);
}
}