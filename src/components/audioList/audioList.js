import React, { Component } from 'react';
import enData from '../../data/en.json';
import hiData from '../../data/hi.json';
import './audioList.css'
import Player from '../audioPlayer/audioPlayer';

class AudioList extends Component{
    state = {
        selectedAlbum: null,
        selectedMusic: null,
        englishLanguage: true
    }
    clickAlbum = (value) => {
        this.setState({
            selectedAlbum: value
        })
    }
    playSelectedMusic = (value) => {
        this.setState({
            selectedMusic: value
        })
    }
    toggleLanguage = (e)=>{
        this.setState({
            englishLanguage: !this.state.englishLanguage
        })
    }
    render(){
        let jsonData;
        if(this.state.englishLanguage){
            jsonData = enData;
        } else{
            jsonData = hiData;
        }
        let listData = [];
        let selectedAlbumsMusic = [];
        for(let one in jsonData){
            let listAlbumToPush = null;
            let albumName = one.slice(5).replace(/_/g, ' ');
            if(this.state.selectedAlbum === one){
                listAlbumToPush = <li key={one} className="collection-item active" onClick={()=>this.clickAlbum(one)}>{albumName}</li>
            } else{
                listAlbumToPush = <li key={one} className="collection-item" onClick={()=>this.clickAlbum(one)}>{albumName}</li>
            }
            listData.push(listAlbumToPush);
        }
        let userSelectedMusics = jsonData[this.state.selectedAlbum];
        for(let one in userSelectedMusics){
            let listMusicToPush = null;
            let musicName = userSelectedMusics[one].slice(5).replace(/_/g, ' ');
            if(this.state.selectedMusic === userSelectedMusics[one]){
                listMusicToPush = <li key={one} className="collection-item active" onClick={()=>this.playSelectedMusic(userSelectedMusics[one])}>{musicName}</li>
            } else{
                listMusicToPush = <li key={one} className="collection-item" onClick={()=>this.playSelectedMusic(userSelectedMusics[one])}>{musicName}</li>
            }
            selectedAlbumsMusic.push(listMusicToPush);
        }
    
        return(
            <React.Fragment>
                <h5>Select Audio Language</h5>  
                <div className="switch">
                    <label>
                    English
                    <input type="checkbox" onChange={this.toggleLanguage}/>
                    <span className="lever"></span>
                    Hindi
                    </label>
                </div> 
                <div className="row">
                    <div className="col s6">
                        <ul className="collection with-header">
                            {listData}
                        </ul>
                    </div>
                    <div className="col s6">
                        <ul className="collection with-header">
                            {selectedAlbumsMusic}
                        </ul>
                    </div>
                    
                </div>
                
                
                {this.state.selectedMusic?<Player src={this.state.selectedMusic} isEnglish={this.state.englishLanguage}/>:null}
            </React.Fragment>
            
        )
    }
}

export default AudioList;