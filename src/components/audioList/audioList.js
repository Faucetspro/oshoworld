import React, { Component } from 'react';
import cookie from 'react-cookies'
import M from 'materialize-css';
import enData from '../../data/en.json';
import hiData from '../../data/hi.json';
import './audioList.css'
import Player from '../audioPlayer/audioPlayer';

class AudioList extends Component{
    state = {
        selectedAlbum: null,
        selectedMusic: null,
        englishLanguage: true,
        history: []
    }
    clickAlbum = (value) => {
        this.setState({
            selectedAlbum: value
        })
    }
    playSelectedMusic = (value, historyClicked=false, albumName=null) => {
        if(historyClicked){
            this.setState({
                selectedMusic: value,
                selectedAlbum: albumName
            })
            return;
        }
        let history = this.state.history;
        history.push({selectedAlbum: this.state.selectedAlbum, selectedAlbumsMusic: value});
        this.setState({
            selectedMusic: value,
            history: history
        })
        cookie.save('history-audio', history, { path: '/' })
    }
    toggleLanguage = (e)=>{
        this.setState({
            englishLanguage: !this.state.englishLanguage
        })
    }

    componentWillMount() {
        let cookies = cookie.load('history-audio');
        if(cookies !== undefined && typeof(cookies) ==="object"){
            this.setState({ history: cookies })
        }
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

        let userStateHistory = this.state.history;
        let history = [];
        for(let one in userStateHistory){
            let listMusicToPush = null;
            let musicName = userStateHistory[one].selectedAlbumsMusic;
            let albumName = userStateHistory[one].selectedAlbum;
            listMusicToPush = <li key={one} className="collection-item active" onClick={()=>this.playSelectedMusic(musicName, true, albumName)}>{musicName}</li>
            history.push(listMusicToPush);
        }
    
        return(
            <React.Fragment>
                <h5>Select Audio Language</h5>
                <a className="waves-effect waves-light btn modal-trigger" href="#modal1">Play History</a>
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
           
                <div id="modal1" className="modal">
                    <div className="modal-content">
                        <div className="row">
                            <div className="col s12">
                                <ul className="collection with-header">
                                    {history}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
           
            </React.Fragment>
            
        )
    }
    componentDidMount(){
        const element = document.querySelectorAll('.modal');
        M.Modal.init(element, {preventScrolling: true});
    }
}

export default AudioList;