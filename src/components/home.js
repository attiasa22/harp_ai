import React from 'react';
import { NavLink } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home-page">
            <h1 id="main-title">Welcome to HarpAI!</h1>
            <h2 id="sub-main-title">The Playlist Generator for Parties</h2>
            <div className="homepage-buttons">
                <NavLink to="/partyAdmin" className="homepage-button">Create a New Party!</NavLink>
                <NavLink to="/joinParty" className="homepage-button">Join a Party!</NavLink>
            </div>
        </div>
    );
};

export default Home;
