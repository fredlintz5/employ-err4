import React from 'react';


	//check boxes for employers desired skills for employee search
function Dropdown(props) {
	return (
		<form   className="text-center" 
				id="dropdown" 
				style={ props.location === "ProfileUser"
							? {color: "#868e96"}
					  	: {color: "#ee5f46",
					  	   textTransform: "uppercase",
					  	   textShadow: "0.5px 0.5px 0.5px rgba(255, 255, 255, 0.78)",
					  	   fontWeight: "600"}}>

			<div className="form-check form-check-inline">
				<label className="form-check-label">
					<input 	className="form-check-input" 
				    		type="checkbox" 
				    		checked={props.mongo}/> Mongo
				</label>
			</div>
			<div className="form-check form-check-inline">
				<label className="form-check-label">
					<input 	className="form-check-input" 
				    		type="checkbox" 
				    		checked={props.express} /> Express
				</label>
			</div>
			<div className="form-check form-check-inline">
				<label className="form-check-label">
				    <input 	className="form-check-input" 
				    		type="checkbox" 
				    		checked={props.react} /> React
				</label>
			</div>
			<div className="form-check form-check-inline">
				<label className="form-check-label">
				    <input 	className="form-check-input" 
				   			type="checkbox" 
				   			checked={props.node} /> Node
				</label>
			</div>
		</form>
	)
}



export default Dropdown;




