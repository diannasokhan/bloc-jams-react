import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar'

class Album extends Component{
	constructor(props) {
		super(props);
		console.log(albumData)
		const album = albumData.find( album => {
			return album.slug === this.props.match.params.slug
		});
		
		this.state = {
			album: album,
			currentSong: album.songs[0],
			isPlaying: false,
			hoveredSong: false,
			currentTime: 0,
			duration: album.songs[0].duration,
			volume: 0,
		
		};
		this.audioElement=document.createElement('audio');
		this.audioElement.src=album.songs[0].audioSrc;
	}
	componentDidMount(){
		this.eventListeners = {
			timeupdate: e => {
			  this.setState({ currentTime: this.audioElement.currentTime });
			},
			durationchange: e => {
			  this.setState({ duration: this.audioElement.duration });
			},
			volumecontrol: e => {
				this.setState({volume : this.audioElement.volume});
			}
		  };
		this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
		this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
		this.audioElement.addEventListener('volumecontrol', this.eventListeners.volumecontrol)
		}
	 
	componentWillUnmount() {
		this.audioElement.src = null;
		this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
		this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
		this.audioElement.removeEventListener('volumecontrol', this.eventListeners.volumecontrol);
   }
	play() {
		this.audioElement.play();
		this.setState({isPlaying: true});
	}	
	pause() {
		this.audioElement.pause();
		this.setState({isPlaying: false});
	}
	setSong(song) {
		this.audioElement.src = song.audioSrc;
		this.setState({currentSong: song});
	}
	handleSongClick(song) {
		const isSameSong = this.state.currentSong === song;
		if (this.state.isPlaying && isSameSong){
			this.pause();
		}
		else {
			if(!isSameSong) {this.setSong(song)}
			this.play();
		}
	}
	handlePrevClick(){
	const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song)	
	const newIndex = Math.max(0, currentIndex - 1);
	const newSong = this.state.album.songs[newIndex];
	this.setSong(newSong);
	this.play();
	}
	handleNextClick(){
		const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
		const newIndex = Math.min(4, currentIndex + 1);
		const newSong = this.state.album.songs[newIndex]
		this.setSong(newSong);
		this.play()
	}
	handleTimeChange(e){
		const newTime = this.audioElement.duration * e.target.value;
		this.audioElement.currentTime = newTime;
		this.setState({ currentTime : newTime});
	}
	formatTime(time){
		const sec = time;
		const min = Math.floor(sec / 60)
		const newSec = Math.floor(sec % 60) 
		if (time !== undefined && time >= 0){
			return (min +':'+ (newSec < 10 ? '0'+newSec : newSec))
		}
		else return '-:--'
	}
	handleVolumeChange(e){
		this.audioElement.volume = e.target.value;
		this.setState({volume : e.target.value})
	}
	getSongIcon(song, index){
		if(this.state.isPlaying && this.state.currentSong === song){
			return (
				<span className='ion-pause'></span>
				)
		}
		else if(this.state.isPlaying === false && this.state.currentSong === song){
			return (
			<span className='ion-play'></span>)
		}
		else if(this.state.onHover === index){
			return(
				<span className='ion-play'></span>
			)
		}
		else return <span> {index + 1}</span>
		}
		handleMouseEnter(index){
			this.setState({onHover : index})
		}
		handleMouseLeave(){
			this.setState({onHover : false})
		}
		render(){
		return(
			<section className="album">
				<section id="album-info">
					<img id="album-cover-art" src={this.state.album.albumCover} alt={this.state.album.title} />
					<div className="album-details" >
						<h1 id="album-title">{this.state.album.title}</h1>
						<h2 className="artist">{this.state.album.artist}</h2>
						<div id="release-info">{this.state.album.releaseInfo}</div>
					</div>
				</section>
				<table id="song-list">
					<colgroup>
						<col id="song-number-column" />
						<col id="song-title-column" />
						<col id="song-duration-column" />
					</colgroup>
					<tbody>
					{this.state.album.songs.map((song, index) =>
					<tr className="song" key={index} onClick={() => this.handleSongClick(song)}>
						<td className="song-action" onMouseEnter={() => this.handleMouseEnter(index)} onMouseLeave={() => this.handleMouseLeave()} >
							<button id="song-action-btn">
								{this.getSongIcon(song, index)}	
							</button>
						</td>
						<td className="song-title">{song.title}</td>
						<td className="song-duration">{this.formatTime(song.duration)}</td>
					</tr>
					 )}
					</tbody>
				</table>
				<PlayerBar 
				isPlaying={this.state.isPlaying} 
				currentSong={this.state.currentSong}
				handleSongClick={() => this.handleSongClick(this.state.currentSong)}
				handlePrevClick={() => this.handlePrevClick()}
				handleNextClick={() => this.handleNextClick()}
				handleTimeChange={(e) => this.handleTimeChange(e)}
				handleVolumeChange={(e) => this.handleVolumeChange(e)}
				currentTime={this.audioElement.currentTime}
				duration={this.audioElement.duration} 
				volume={this.state.volume}
				formatTime={(time) => this.formatTime(time)}/>
			</section>

		)
	}
}
export default Album