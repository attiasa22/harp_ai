import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as backend from '../services/datastore';
import Audio from './audio';

const PartyAdmin = (props) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [members, setMembers] = useState('');

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
    console.log(members);
    return (
        <div className="home-page">
            <h1 id="main-title">Your Party: {id}</h1>
            <h2>Participants: {members}</h2>
            <Audio/>
            <button type="button" onClick={() => closeParty(id)}>End Party</button>
            <div className='.button-align'>               
                    <input onClick={() => updateEmotion(id, "joy")} type="submit" class=" emotion-button joy-button" value="" />
                    <input onClick={() => updateEmotion(id, "sad")} type="submit" class="sad-button emotion-button" value="" />
                    <input onClick={() => updateEmotion(id, "angry")} type="submit" class="angry-button emotion-button" value="" />
                    <input onClick={() => updateEmotion(id, "disgusted")} type="submit" class="disgusted-button emotion-button" value="" />
                    <input onClick={() => updateEmotion(id, "confused")} type="submit" class="confused-button emotion-button" value="" />
            </div>
        </div>
    );
}

export default PartyAdmin;

