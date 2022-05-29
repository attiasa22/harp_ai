import React, { Component } from 'react';

class PartyAdmin extends Component {
    constructor(props) {
      super(props);
  
      this.state = {};
  
    }

    render() {
        return (
            <div className="home-page">
                <script>        
                    function onButtonClick(emotion){
                      console.log("Hello")
                      
                    }
                </script>
                <h1 id="main-title">Your Party</h1>
                <h2>Participants:</h2>
                <button type="button">Record</button>
                <h2>Does this song make you feel too:</h2>
                <div className='.button-align'>               
                    <input type="submit" class=" emotion-button joy-button" value="" />
                    <input type="submit" class="sad-button emotion-button" value="" />
                    <input type="submit" class="angry-button emotion-button" value="" />
                    <input type="submit" class="disgusted-button emotion-button" value="" />
                    <input onclick="onButtonClick('confused')" type="submit" class="confused-button emotion-button" value="" />
                </div>
            </div>
        );
    }
}

export default PartyAdmin;

