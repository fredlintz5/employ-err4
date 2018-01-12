import React from 'react';

import Card from '../Card/Card';

	//matched card that shows matched based off employer search, requested connections from employers for employees, and potential employees awaiting approval
	
function Matches(props) {
	return (
		<div className="card" style={{width: "100%", height: "70vh", boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)"}}>
		  <div className="card-header" style={{padding: "5px 0px 0px 10px"}}>
	  		<h4>{props.userData.type === 'employee' ? 'Interested Employers' : 'Potential Employees' }</h4>
		  </div>
		  <div className="card-block container" style={{height: "500px", overflow: "auto"}}>
		  	{ props.userData.matches
	  			? props.userData.matches.map((card, index) => (
			  		<Card 	
			  			key={index} 
			  			linkedInId={card.linkedInId}
			  			displayName={card.displayName} 
			  			email={card.email}
			  			image={card.image}
			  			title={card.title}
			  			bio={card.bio}
			  			type={props.userData.type} 
			  			href={props.href} 
			  			toggle={props.toggle}/>))
	  			: "No Matches Yet" }
	  		{ props.userData.pendingMatches
	  			? props.userData.pendingMatches.map((card, index) => (
			  		<Card 	
			  			key={index} 
			  			linkedInId={card.linkedInId}
			  			displayName={card.displayName} 
			  			email={card.email}
			  			image={card.image}
			  			title={card.title}
			  			bio={card.bio}
			  			pending={true}
			  			type={props.userData.type}
			  			pendingClick={props.pendingClick}
			  			href={""}
			  			toggle={"pending"}/>))
	  			: "No Matches Yet" }
		  </div>
		</div>
	)
}


export default Matches;




