import React, { Component } from 'react';
import Preform from './Preform';
import Table from './Table';
import Seform from './Seform';

class App extends Component {

  state = {
    characters: [

    ],
    hostnum: '',
    ref1: '',
    ref2: '',
    onerow: {}
  };

  handleFormChange = event => {
    const {name, value } = event.target;
    this.setState({
      [name] : value
    });
  }
  handleTrChange = row =>{
    this.setState(
    {
      onerow: row
    });
  }

  handleSubmit = character => {

    for( let i=0;i<character.length;i++)
    {
        this.setState({characters: [...this.state.characters, character[i]]});
    }
    this.setState(
      { hostnum: '',
        ref1: '',
        ref2: ''}
    );
  }
  


  render() {
    const { characters }= this.state;
    const { onerow} =this.state;
    return (
      <div className="App">
        <Preform handleSubmit={this.handleSubmit}  
                  OnformChange={this.handleFormChange}
                  state = {this.state } />
        <Table 
          characterData={characters} 
          handleTrChange={this.handleTrChange}
        /> 
        <Seform onerow={onerow} />
      </div>

    );
  }
}

export default App;
