import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as backend from '../services/datastore';

const PartyMember = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const leaveParty = () => {
        navigate("/");
    }

    return (
        <div className="home-page">
            <h1 id="main-title">In Party: {id}</h1>
            <button type="button">Vote</button>
            <button type="button" onClick={() => leaveParty(id)}>Leave Party</button>
        </div>
    );
}

export default PartyMember;
