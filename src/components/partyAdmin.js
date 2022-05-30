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
        </div>
    );
}

export default PartyAdmin;
