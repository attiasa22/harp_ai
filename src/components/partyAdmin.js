import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as backend from '../services/datastore';

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
    console.log(members);
    return (
        <div className="home-page">
            <h1 id="main-title">Your Party: {id}</h1>
            <h2>Participants: {members}</h2>
            <button type="button">Record</button>
            <button type="button" onClick={() => closeParty(id)}>End Party</button>
            <div className='.button-align'>               
                    <input  type="submit" class=" emotion-button joy-button" value="" />
                    <input  type="submit" class="sad-button emotion-button" value="" />
                    <input  type="submit" class="angry-button emotion-button" value="" />
                    <input type="submit" class="disgusted-button emotion-button" value="" />
                    <input  type="submit" class="confused-button emotion-button" value="" />
            </div>
        </div>
    );
}

export default PartyAdmin;
