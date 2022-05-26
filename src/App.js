import React, { Component } from 'react';
import Audio from "./components/audio.component";


import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
} from 'react-router-dom';
import './App.css';
import Home from './components/home';
import JoinParty from './components/joinParty';
import PartyAdmin from './components/partyAdmin';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <div className="nav">
            <NavLink to="/" className="home-link"><p className="nav-title">HarpAI</p></NavLink>
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/joinParty" element={<JoinParty />} />
            <Route path="/partyAdmin" element={<PartyAdmin />} />
            <Route path="*" element={<div>post not found </div>} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
