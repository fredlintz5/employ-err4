import React, {Component} from 'react';
import './Cards.css';


class Card extends Component {	

	setToggle = (toggle) => {
		switch (toggle) {
			case "modal": 
				return "modal"
				break;
			case "connections": 
				return ""
				break;
			case "pending": 
				return ""
				break;
		}
	}

	setHref = (href) => {
		switch (href) {
			case "modal": 
				return "#swipeModal"
				break;
			case "connections": 
				return `mailto:${this.props.email}?Subject=Employerr%20App%20Connection`
				break;
			case "pending": 
				return ""
				break;
		}
	}

	setOnClick = (boolean) => {
		if (boolean) {
			this.props.pendingClick()
		}
	}

	render () {
		const {toggle, href, image, pending, displayName, title, bio, type, linkedInId} = this.props;
		return (
			<a className="row displayCard" data-toggle={this.setToggle(toggle)} 
										   href={this.setHref(href)}
										   data-linkedinid={linkedInId}
										   onClick={() => this.setOnClick(pending)}>
				<div className="col-lg-4 text-center" style={{paddingLeft: "10px"}}>
					<img src={image} alt="user" height="70px" style={{borderRadius: "100%"}}/>
					<span id="thumbsUp"><i style={pending && type === "employer" ? {display: "block"} : {display: "none"}} className="fa fa-thumbs-up" aria-hidden="false"></i></span>
				</div>
				<div className="col-lg-8" style={{padding: "10px 0px 0px 20px"}}>
			    	<p>{displayName.slice(0, 35)}</p>
			    	<p>{title.slice(0, 35)}</p>
			    	<p>{bio.slice(0, 35)}</p>
				</div>
			</a>
		)
	}
}


export default Card;