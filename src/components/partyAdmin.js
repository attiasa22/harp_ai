import React, { Component } from 'react';

class PartyAdmin extends Component {
    constructor(props) {
      super(props);
  
      this.state = {};
    }

    render() {
        return (
            <div className="home-page">
                <h1 id="main-title">Your Party</h1>
                <h2>Participants:</h2>
                <button type="button">Record</button>
            </div>
        );
    }
}

export default PartyAdmin;
