import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
        const userEmotions = await backend.getnormalisedEmotion(id);

        console.log(recordingEmotions);
        console.log(userEmotions);

        for (const [key, value] of Object.entries(recordingEmotions)) {
            if (userEmotions.includes(value)) {
                recordingEmotions[key] += userEmotions[value];
            }
        }

        const highest = Math.max(recordingEmotions);
        console.log(highest);
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

