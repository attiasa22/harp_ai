import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as backend from '../services/datastore';

const PartyMember = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const enterRoom = async () => {
          backend.joinRoom(id);
        };
    
        enterRoom();
    }, []);

    const updateEmotion = (id, emotion) => {
        backend.updateEmotion(id, emotion);
    }

    const leaveParty = () => {
        navigate("/");
    }

    return (
        <div className="home-page">
            <h1 id="main-title">In Party: {id}</h1>
            <button type="button">Vote</button>
            <button type="button" onClick={() => leaveParty(id)}>Leave Party</button>
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

export default PartyMember;
