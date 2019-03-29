import React, { Component } from 'react';
import albumData from './../data/albums';
import { Link } from 'react-router-dom';

class Library extends Component{
	constructor(props){
		super(props);
		this.state={albums: albumData}
	}
	render(){
		return(
			<section className='library'>
			{
				this.state.albums.map((album, index) =>
					
					<Link className="album-link" to={`/album/${album.slug}`} key={index}>
						<img className="album-info" id="album-img" src={album.albumCover} alt={album.title} />
						<div className="album-info">{album.title}</div>
						<div className="album-info">{album.artist}</div>
						<div className="album-info">{album.songs.length} songs</div>
					</Link>
					
				)
			}
			</section>
		)
	}
}
export default Library;