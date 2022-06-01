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
            <input class="id-input" type="text" value={id} onChange={handlePartyId} />
            <NavLink to={`/partyMember/${id}`} class="join-btn">Join</NavLink>
        </div>
    );
};

export default JoinParty;
