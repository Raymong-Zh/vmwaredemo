import React, { Component } from 'react';
import Preform from './Preform';
import Table from './Table';

class App extends Component {
  state = {
    characters: [

    ],
    hostnum: '',
    ref1: '',
    ref2: ''
  };
  handleSubmit = character => {

    for( let i=0;i<character.length;i++)
    {
        this.setState({characters: [...this.state.characters, character[i]]});
    }
  }
  


  render() {
    const { characters }= this.state
    return (
      <div className="App">
        <Preform handleSubmit={this.handleSubmit}  />
        <Table 
          characterData={characters} 
        /> 
      </div>

    );
  }
}

export default App;
