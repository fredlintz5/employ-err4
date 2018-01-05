import React, {Component} from 'react';
import './Cards.css';


class Card extends Component {	

	setToggle = (toggle, type) => {
		if (toggle === "modal" && type === "employer") {
			return "modal"
		} else if (toggle === "pending" && type === "employee") {
			return "modal"
		} else if (toggle === "pending" && type === "employer") {
			return ""	
		} else if (toggle === "connections") {	
			return ""
		}
	}

	setHref = (href, type) => {
		if (href === "modal" && type === "employer") {
			return "#swipeModal"
		}  else if (href === "pending" && type === "employer") {
			return ""
		}  else if (href === "" && type === "employee") {
			return "#swipeModal"
		}  else if (href === "connections") {
			return `mailto:${this.props.email}?Subject=Employerr%20App%20Connection`
		}
	}

	setOnClick = (boolean, type) => {
		if (boolean === true && type === "employer") {
			this.props.pendingClick()
		}
	}

	render () {
		const {toggle, href, image, pending, displayName, title, bio, type, linkedInId} = this.props;
		return (
			<a className="row displayCard" data-toggle={this.setToggle(toggle, type)} 
										   href={this.setHref(href, type)}
										   data-linkedinid={linkedInId}
										   onClick={() => this.setOnClick(pending, type)}>
				<div className="col-lg-4 text-center" style={{paddingLeft: "10px"}}>
					<img src={image} alt="user" height="70px" style={{borderRadius: "100%"}}/>
					<span id="thumbsUp" style={pending && type === "employer" ? {display: "block"} : {display: "none"}}><i className="fa fa-thumbs-up" aria-hidden="false"></i></span>
				</div>
				<div className="col-lg-8" style={{padding: "10px 0px 0px 20px"}}>
			    	<p>{displayName ? displayName : "insert Display Name here..."}</p>
			    	<p>{title ? title : "insert Title here..."}</p>
			    	<p>{bio ? bio : "insert Bio here..."}</p>
				</div>
			</a>
		)
	}
}


export default Card;