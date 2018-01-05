import React, {Component} from 'react';
import ModalSwipeEmployee from './ModalSwipeEmployee';
import ModalSwipeEmployer from './ModalSwipeEmployer';
import "./ModalSwipe.css"

	

class ModalSwipe extends Component {

	state = {
		type: ""
	}

	componentWillMount() {
		this.setState({type: this.props.type})
	}

	render() {
		const {matches, pendingMatches, thumbsDown, thumbsUp, type} = this.props;
		return (
			<div>
			{this.state.type === 'employer' 
				?  <ModalSwipeEmployer 
						matches={matches}
						pendingMatches={pendingMatches}
						type={type}
						thumbsDown={thumbsDown}
						thumbsUp={thumbsUp}/>
				: <ModalSwipeEmployee 
						matches={matches}
						pendingMatches={pendingMatches}
						type={type}
						thumbsDown={thumbsDown}
						thumbsUp={thumbsUp}/>
			}
			</div>
		)
	}
}

export default ModalSwipe;