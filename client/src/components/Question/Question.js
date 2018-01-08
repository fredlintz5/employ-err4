import React, {Component} from 'react';
import axios from 'axios';



class Question extends Component {

	// set type of user, either "employee" or "employer" to render specific page features
	setUserType = (type) => {
		axios.put('/api/users/type/' + window.location.href.slice(27), {type: type})
			 .then(response => {
			 	if (response.data === "success"){
			 		this.props.getProfile()
			 	}
			 })
	}

	render() {
		return (
			<div className="card" style={{width: "350px", margin: "auto", marginTop: "20vh"}}>
			  <div className="card-body text-center">
			    <h5 className="card-title">How will you use the Employ{`{err}`} App?</h5>
			    	<button className="btn btn-primary" onClick={() => this.setUserType('employee')}style={{marginBottom: '10px'}}>I am a Job Seeker</button>
			    	<button className="btn btn-primary"onClick={() => this.setUserType('employer')}>I am a Job Provider</button>
			  </div>
			</div>
		)
	}
}

export default Question;