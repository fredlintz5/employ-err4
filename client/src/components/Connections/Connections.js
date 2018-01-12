import React from 'react';
import Card from '../Card/Card';

	//connections between employer and employee after both give the thumbs up
function Connections(props) {
	return (
		<div className="card" style={{width: "100%", height: "70vh", boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)"}}>
			<div className="card-header" style={{padding: "5px 0px 0px 10px"}}>
				<h4>Connections</h4>
			</div>
			<div className="card-block container" style={{height: "500px", overflow: "auto"}}>
			  	{ props.userData.connections 
			  		? props.userData.connections.map((card, index) => (
			  			<Card 	
				  			key={index} 
				  			displayName={card.displayName} 
				  			image={card.image}
				  			title={card.title}
				  			bio={card.bio}
				  			email={card.email}
				  			toggle={props.toggle}
				  			href={props.href}/>))
			  		: "No Connections yet..."}
		  	</div>
		</div>
	)
}




export default Connections;


