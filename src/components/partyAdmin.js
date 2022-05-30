import React, { Component } from 'react';
import Audio from './audio';
//mport { updateEmotion } from '../services/datastore';

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
                <Audio/>
                <h2>Does this song make you feel too:</h2>
                <div className='.button-align'>               
                    <input  type="submit" class=" emotion-button joy-button" value="" />
                    <input  type="submit" class="sad-button emotion-button" value="" />
                    <input  type="submit" class="angry-button emotion-button" value="" />
                    <input type="submit" class="disgusted-button emotion-button" value="" />
                    <input  type="submit" class="confused-button emotion-button" value="" />
                </div>



            </div>
        );
    }
}

export default PartyAdmin;

