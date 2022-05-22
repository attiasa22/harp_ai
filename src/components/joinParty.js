import React, { useState } from 'react';

const JoinParty = () => {
    const [partyId, setPartyId] = useState('');

    const handlePartyId = (event) => {
        setPartyId(event.target.value);
    };

    return (
        <div className="home-page">
            <h1 id="main-title">Join a Party!</h1>
            <p>Enter Party Id</p>
            <input type="text" value={partyId} onChange={handlePartyId} />
            <button type="button">Join</button>
        </div>
    );
};

export default JoinParty;
