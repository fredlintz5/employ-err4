import React from 'react';
import './Cards.css';


function Card(props) {	
	return (
		<a className="row displayCard" data-toggle={props.toggle} href={props.toggle ? props.href : `${props.href}${props.email}?Subject=Employerr%20App%20Connection`}>
			<div className="col-sm-4 text-center" style={{paddingLeft: "10px"}}>
				<img src={props.image} alt="user" height="70px" style={{borderRadius: "100%"}}/>
			</div>
			<div className="col-sm-8" style={{lineHeight: "5px", padding: "10px 0px 0px 20px"}}>
		    	<p>{props.displayName}</p>
		    	<p>{props.title}</p>
		    	<p>{props.bio}</p>
			</div>
		</a>
	)
}


export default Card;