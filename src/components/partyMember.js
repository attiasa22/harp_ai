import React, { Component } from 'react';

class PartyMember extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            partyId: props.partyId,
        };
      }
}

export default PartyMember;
