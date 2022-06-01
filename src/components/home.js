import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import * as backend from '../services/datastore';

const Home = () => {
    const navigate = useNavigate();

    const makeRoom = async () => {
        let partyId = null;
        const genPartyId = (max, min) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };
        partyId = genPartyId(100000, 1000000);
        const room = {
         [partyId.toString()]: {members: 1}
        };
        
        backend.createRoom(room);
        
        navigate(`/partyAdmin/${partyId}`);
    }

    return (
        <div className="home-page">
            <h1 id="main-title">Welcome to HarpAI!</h1>
            <h4 id="sub-main-title">The Playlist Generator for Parties</h4>
            <div className="homepage-buttons">
                <button type="button" className="homepage-button" onClick={makeRoom}>Create a New Party!</button>
                <NavLink to="/joinParty" className="homepage-button">Join a Party!</NavLink>
            </div>
        </div>
    );
};

export default Home;
