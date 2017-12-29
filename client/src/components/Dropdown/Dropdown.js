import React from 'react';


function Dropdown(props) {
	return (
		<form className="text-center" style={{color: props.textColor}}>
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