import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as backend from '../services/datastore';
import Audio from './audio';

const PartyAdmin = (props) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [members, setMembers] = useState('');
    const [recordingEmotions, setRecordingEmotions] = useState({});

    useEffect(() => {
        const fetchRoom = async () => {
          backend.getRoom(id, setMembers);
        };
    
        fetchRoom();
    }, []);

    const closeParty = (id) => {
        backend.deleteRoom(id, navigate);
    }
    const updateEmotion = (id, emotion) => {
        backend.updateEmotion(id, emotion);
    }

    const createPlaylist = async () => {
        const overallEmotions = {};
        const userEmotions = await backend.getnormalisedEmotion(id);

        console.log(recordingEmotions);
        console.log(userEmotions);

        const userEmotionsExist = Object.keys(userEmotions);

        for (const [key, value] of Object.entries(recordingEmotions)) {
            if (key === "sadness") {
                if (userEmotionsExist.includes("sad")) {
                    overallEmotions[key] = value + (.2 * userEmotions["sad"]);
                } else {
                    overallEmotions[key] = value;
                }
            }
            if (key === "anger") {
                if (userEmotionsExist.includes("angry")) {
                    overallEmotions[key] = value + (.2 * userEmotions["angry"]);
                } else {
                    overallEmotions[key] = value;
                }
            }
            if (key === "joy") {
                if (userEmotionsExist.includes("joy")) {
                    overallEmotions[key] = value + (.2 * userEmotions["joy"]);
                } else {
                    overallEmotions[key] = value;
                }
            }
            if (key === "fear") {
                if (userEmotionsExist.includes("confused")) {
                    overallEmotions[key] = value + (.2 * userEmotions["confused"]);
                } else {
                    overallEmotions[key] = value;
                }
            }
            if (key === "disgust") {
                if (userEmotionsExist.includes("disgusted")) {
                    overallEmotions[key] = value + (.2 * userEmotions["disgusted"]);
                } else {
                    overallEmotions[key] = value;
                }
            }
        }
        console.log(overallEmotions)
        const highest = Object.keys(overallEmotions).reduce(function(a, b){ return overallEmotions[a] > overallEmotions[b] ? a : b });
        console.log(highest);

        let formData = new FormData();
        formData.append("emotion", highest);
        const response = await axios.post(`http://localhost:1880/emotions`, formData);
    }

    return (
        <div className="home-page">
            <h1 id="main-title">Your Party: {id}</h1>
            <h2>Participants: {members}</h2>
            <Audio setRecordingEmotions={setRecordingEmotions}/>
            <button type="button" onClick={() => createPlaylist()}>Create Playlist</button>
            <button type="button" onClick={() => closeParty(id)}>End Party</button>
            <div className='.button-align'>               
                    <input onClick={() => updateEmotion(id, "joy")} type="submit" className=" emotion-button joy-button" value="" />
                    <input onClick={() => updateEmotion(id, "sad")} type="submit" className="sad-button emotion-button" value="" />
                    <input onClick={() => updateEmotion(id, "angry")} type="submit" className="angry-button emotion-button" value="" />
                    <input onClick={() => updateEmotion(id, "disgusted")} type="submit" className="disgusted-button emotion-button" value="" />
                    <input onClick={() => updateEmotion(id, "confused")} type="submit" className="confused-button emotion-button" value="" />
            </div>
        </div>
    );
}

export default PartyAdmin;

