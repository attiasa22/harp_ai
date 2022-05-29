import React, { Component } from 'react';

class PartyAdmin extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
          partyId: null,
      };
    }

    componentDidMount() {
        const genPartyId = (max, min) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        this.setState(() => ({ partyId: genPartyId(100000, 1000000)}));
    }

    render() {
        return (
            <div className="home-page">
                <h1 id="main-title">Your Party: {this.state.partyId}</h1>
                <h2>Participants:</h2>
                <button type="button">Record</button>
            </div>
        );
    }
}

export default PartyAdmin;
