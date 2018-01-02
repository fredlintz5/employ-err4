import React from 'react';
import "./Footer.css";


function Footer(props) {
	return (
		<footer className="row">
			<h2 className="swipetext text-center">SWIPE NOW</h2>
			<h3 className="text-white" style={props.hideText ? {display: "none"} : {display: "block"}}>Login and start recruiting!</h3>
		</footer>
	)
}


export default Footer;