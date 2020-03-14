import React, {Component} from 'react';
import AudioList from './components/audioList/audioList';
import './App.css';

class App extends Component {
  render(){
    return (
      <div className="App">
        <h4>Osho All Audio Resources</h4>
        <AudioList />
      </div>
    );
  }
}

export default App;
