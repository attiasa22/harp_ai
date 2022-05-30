import React, { Component } from 'react';
import { updateEmotion } from '../services/datastore';

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
                <h2>Does this song make you feel too:</h2>
                <div className='.button-align'>               
                    <input onclick={() => updateEmotion(this.state.partyId,"joy")} type="submit" class=" emotion-button joy-button" value="" />
                    <input onclick={() => updateEmotion(this.state.partyId,"sad")} type="submit" class="sad-button emotion-button" value="" />
                    <input onclick={() => updateEmotion(this.state.partyId,"angry")} type="submit" class="angry-button emotion-button" value="" />
                    <input onclick={() => updateEmotion(this.state.partyId,"disgusted")} type="submit" class="disgusted-button emotion-button" value="" />
                    <input onclick={() => updateEmotion(this.state.partyId,"confused")} type="submit" class="confused-button emotion-button" value="" />
                </div>
            </div>
        );
    }
}

export default PartyAdmin;

