import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './audioPlayer.css';

const Player = (props) => {
    let mainURL = 'http://www.oshoarchive.com/ow-english';
    if(!props.isEnglish){
        mainURL = 'http://www.oshoarchive.com/ow-hindi'
    }
    return(
        <AudioPlayer
        autoPlay={true}
        src={`${mainURL}/${props.src}`}
        onPlay={e => console.log("onPlay")}
        className="customStyles"
        />
    )
    
};

  export default Player;