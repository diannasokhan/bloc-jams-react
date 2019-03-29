import React from 'react';

const Landing = () => (
	<section className="landing">
		<div id="title-box">
		<h1 className="hero-title">Turn the music up!</h1>
		</div>
		<section className="selling-points">
		<div className="point">
			<h2 className="point-title">Choose your music.</h2>
			<span className="ion-headphone"></span>
			<p className="point-description">The world is full of music; why should you have to listen to music that someone else chose?</p>
		</div>
		<div className="point">
			<h2 className="point-title">Unlimited, streaming, ad-free.</h2>
			<span className="ion-radio-waves"></span>
			<p className="point-description">No arbitrary limits.No distractions</p>
		</div>
		<div className="point">
			<h2 className="point-title">Mobile enabled.</h2>
			<span className="ion-iphone"></span>
			<p className="point-description">Listen to your music on the go. This streaming service is available on all mobile platforms.</p>
		</div>
		</section>
	</section>
	);

export default Landing;