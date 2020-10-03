import React, {Fragment} from 'react';
import AudioList from './components/audioList/audioList';
import ParticleBackground from './components/ParticleBG/ParticleBackground'
import './App.css';
const App = () => {
  return (
    <Fragment>
      <ParticleBackground />
      <div className="App">
          <h4>Osho All Audio Resources</h4>
          <AudioList />
      </div>
    </Fragment>
  )
}

export default App
