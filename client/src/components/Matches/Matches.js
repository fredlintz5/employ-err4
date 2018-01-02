import React from 'react';
import Card from '../Card/Card';


function Matches(props) {
	return (
		<div className="card" style={{width: "100%", height: "70vh", boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)"}}>
		  <div className="card-header" style={{padding: "5px 0px 0px 10px"}}>
	  		<h4>Matches</h4>
		  </div>
		  <div className="card-block container" style={{height: "500px", overflow: "auto"}}>
		  	{ props.matches
	  			? props.matches.map((card, index) => (
			  		<Card 	
			  			key={index} 
			  			displayName={card.displayName} 
			  			email={card.email}
			  			image={card.image}
			  			title={card.title}
			  			bio={card.bio}
			  			href={props.href}
			  			toggle={props.toggle}/>))
	  			: "No Data Yet" }
	  		{ props.pendingMatches
	  			? props.pendingMatches.map((card, index) => (
			  		<Card 	
			  			key={index} 
			  			displayName={card.displayName} 
			  			email={card.email}
			  			image={card.image}
			  			title={card.title}
			  			bio={card.bio}
			  			pending={true}
			  			pendingClick={props.pendingClick}
			  			href={""}
			  			toggle={"pending"}/>))
	  			: "No Data Yet" }
		  </div>
		</div>
	)
}


export default Matches;




