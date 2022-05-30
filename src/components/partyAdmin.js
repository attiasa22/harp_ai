import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as backend from '../services/datastore';

const PartyAdmin = (props) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [party, setParty] = useState({});

    useEffect(() => {
        const fetchRoom = async () => {
          backend.getRoom(id, setParty);
        };
    
        fetchRoom();
      }, []);

    const closeParty = (id) => {
        backend.deleteRoom(id, navigate);
    }

    return (
        <div className="home-page">
            <h1 id="main-title">Your Party: {id}</h1>
            <h2>Participants: {Object.values(party)[0]['members']}</h2>
            <button type="button">Record</button>
            <button type="button" onClick={() => closeParty(id)}>End Party</button>
        </div>
    );
}

export default PartyAdmin;
