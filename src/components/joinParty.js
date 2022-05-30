import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const JoinParty = () => {
    const [id, setId] = useState('');

    const handlePartyId = (event) => {
        setId(event.target.value);
    };

    return (
        <div className="home-page">
            <h1 id="main-title">Join a Party!</h1>
            <p>Enter Party Id</p>
            <input className="id-input" type="text" value={id} onChange={handlePartyId} />
            <NavLink to={`/partyMember/:${id}`} className="join-btn">Join</NavLink>
        </div>
    );
};

export default JoinParty;
