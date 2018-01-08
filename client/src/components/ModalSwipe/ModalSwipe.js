import React, {Component} from 'react';
import axios from 'axios';

import ModalSwipeEmployee from './ModalSwipeEmployee';
import ModalSwipeEmployer from './ModalSwipeEmployer';

import "./ModalSwipe.css"

	

class ModalSwipe extends Component {
	
	// this behaves differently depending on what type of user is logged in (employee or employer)
	thumbsUp = () => {
		axios.put(`/api/users/thumbsup/${this.props.userData.linkedInId}/${this.props.userData.type}`, {userData: this.props.userData})
			 .then(result => (
			 	result.data === 'success' 
				 	? this.props.getProfile() 
				 	: console.log("something's broken in thumbs up function")))
			 .catch(err => console.log(err))
	}

	// this behaves differently depending on what type of user is logged in (employee or employer)
	thumbsDown = () => {
		axios.put(`/api/users/thumbsdown/${this.props.userData.linkedInId}/${this.props.userData.type}`,{userData: this.props.userData})
			 .then(result => (
			 	result.data === 'success' 
				 	? this.props.getProfile() 
				 	: console.log("something's broken in thumbs down function")))
			 .catch(err => console.log(err))
	}

	render() {
		return (
			<div>
				{this.props.userData.type === 'employer' 
					?  <ModalSwipeEmployer 
							userData={this.props.userData}
							thumbsDown={this.thumbsDown}
							thumbsUp={this.thumbsUp}/>
					: <ModalSwipeEmployee 
							userData={this.props.userData}
							thumbsDown={this.thumbsDown}
							thumbsUp={this.thumbsUp}/>
				}
			</div>
		)
	}
}

export default ModalSwipe;




