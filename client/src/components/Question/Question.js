import React from 'react';


function Question(props) {
	return (
		<div className="card" style={{width: "350px", margin: "auto", marginTop: "20vh"}}>
		  <div className="card-body text-center">
		    <h5 className="card-title">How will you use the Employ{`{err}`} App?</h5>
		    	<button className="btn btn-primary" onClick={() => props.setType('employee')}style={{marginBottom: '10px'}}>I am a Job Seeker</button>
		    	<button className="btn btn-primary"onClick={() => props.setType('employer')}>I am a Job Provider</button>
		  </div>
		</div>
	)
}

export default Question;