import React from 'react';



function NotFound() {
	return (
		<div className="jumbotron text-center" style={{height: "100vh"}}>
			<h1 className="display-3">404 Not Found</h1>
			<p className="lead">How did you get here?</p>
			<a className="btn btn-default" href='/' style={{border: '1px solid black'}}>Go back to your home...</a>
		</div>
	)
}

export default NotFound;