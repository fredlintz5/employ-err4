import React from 'react';
import "./Footer.css";

	// footer rendered on every page
function Footer(props) {
	return (
		<footer className="row" id="footer">
			<h2 className="swipetext text-center">Swipe Now!</h2>
			<h3 className="text-white" style={props.hideText ? {display: "none"} : {display: "block"}}>Login and start recruiting!</h3>
		</footer>
	)
}


export default Footer;