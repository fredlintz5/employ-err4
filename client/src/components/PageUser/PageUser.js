import React, {Component} from 'react';
import ModalSwipe from '../ModalSwipe/ModalSwipe';
import Question from '../Question/Question';
import Matches from '../Matches/Matches';
import Connections from '../Connections/Connections';
import ProfileUser from '../ProfileUser/ProfileUser';
import Dropdown from '../Dropdown/Dropdown';
import Navigator from '../Navigator/Navigator';
import Footer from '../Footer/Footer';
import "../PageUser/PageUser.css";
import axios from 'axios';



class PageUser extends Component {

	state = {
		type: "",
		id: "",
		userData: {},
		navOpen: false
	}

	componentWillMount() {
		this.getProfile();
	}

	setUserType = (type) => {
		let url = window.location.href.slice(27);

		this.setState({type: type});
		axios.put(`/api/users/type/${url}`, {
          type: type
        })
	}

	getProfile = () => {
		let url = window.location.href.slice(27);

		axios('/api/users/user/' + url)
		.then(res => {
			if (res.data[0]) {
				this.setState({
					type: res.data[0].type,
					id: res.data[0].linkedInId,
					userData: res.data[0]
				})
			} else {console.log('no user yet')}
		})
	}

	updateProfile = () => {
		console.log('will fix this later');
      // let bio = document.getElementById('employee-bio').value;
      // let title = document.getElementById('employee-title').value;
      // let email = document.getElementById('employee-email').value;
      // if (bio !== "" && title !== "" && email !== "" ) {
      //   axios.put(`/api/users/${this.state.id}`, {
      //     bio: bio,
      //     title: title,
      //     email: email
      //   })
      //   .then(response => {
      //     if (response.request.status === 200) {
      //     	document.getElementById('employee-bio').value = "";
      //     	document.getElementById('employee-title').value = "";
      //     	document.getElementById('employee-email').value = "";
      //       this.getProfile();
      //     }
      //   })
      //   .catch(error => console.log(error));
      // } else console.log('input something to change dingus!');
    }

	openNav = () => {
		document.getElementById("mySidenav").style.width = "375px";
		document.getElementById("main").style.opacity = "0.15";
		document.getElementById('main').style.pointerEvents = 'none';
		document.getElementById('root').classList.add("stop-scrolling");
		document.getElementById('caretDiv').style.transform ="rotate(-180deg)";
		document.getElementById('caretDiv').style.left = "375px";
		this.setState({navOpen: true})
	}

	closeNav = () => {
		document.getElementById("mySidenav").style.width = "0px";
		document.getElementById("main").style.opacity = "1.0";
		document.getElementById('main').style.pointerEvents = 'auto';
		document.getElementById('root').classList.remove("stop-scrolling");
		document.getElementById('caretDiv').style.transform = "rotate(0deg)";
		document.getElementById('caretDiv').style.left = "0px";
		this.setState({navOpen: false})
	}

	thumbsUp = () => {
		axios.put(`/api/users/thumbsup/${this.state.id}/${this.state.type}`, {userData: this.state.userData})
			 .then(result => (
			 	result.data === 'success' 
				 	? this.getProfile() 
				 	: console.log("shit didnt work")))
			 .catch(err => console.log(err))
	}

	thumbsDown = () => {
		axios.put(`/api/users/thumbsdown/${this.state.id}`,{match: this.state.userData.matches[0]})
			 .then(result => (
			 	result.data === 'success' 
				 	? this.getProfile() 
				 	: console.log("shit didnt work")))
			 .catch(err => console.log(err))
	}

	pendingClick = () => {
		document.getElementById("pendingAlert").style.marginTop = "0px";
 		document.getElementById("pendingAlert").style.opacity = "1";
 		setTimeout(() => {
 			document.getElementById("pendingAlert").style.marginTop = "-73px";
 			document.getElementById("pendingAlert").style.opacity = "0";
 		}, 2000)
	}


	searchMatches = () => {
		let matchedIds = [];
		let pendingIds = [];
		let connectionIds = [];

		if (this.state.userData.matches.length > 0 || this.state.userData.pendingMatches.length > 0 ) {
			matchedIds = this.state.userData.matches.map(match => match.linkedInId);
			pendingIds = this.state.userData.pendingMatches.map(pending => pending.linkedInId);
			connectionIds = this.state.userData.connections.map(connection => connection.linkedInId);
			
			console.log(connectionIds);

			axios.put(`/api/users/employees/${this.state.id}`,
				{
					matchedIds: matchedIds,
					pendingIds: pendingIds,
					connectIds: connectionIds
				})
				 .then(result => {
				 	if (result.data === 'success') {
				 		this.getProfile()
				 	} else {
				 		document.getElementById("searchAlert").style.marginTop = "0px";
				 		document.getElementById("searchAlert").style.opacity = "1";
				 		setTimeout(() => {
				 			document.getElementById("searchAlert").style.marginTop = "-73px";
				 			document.getElementById("searchAlert").style.opacity = "0";
				 		}, 2000)
				 	}
				 })
				 .catch(err => console.log(err))
			
		} else {
			axios.get(`/api/users/employees/${this.state.id}`)
				 .then(result => (result.data === 'success') 
				 	? this.getProfile()
				 	: console.log("WTF?"))
				 .catch(err => console.log(err))
		}
	}

	render () {
		return (
			<div>
			{this.state.type === "" ? <Question setType={this.setUserType}/> : 
				<div>
					<Navigator openNav={this.openNav} closeNav={this.closeNav} navOpen={this.state.navOpen} none='none'/>

					<div id="mySidenav" className="sidenav" style={{zIndex: "2000"}}>
					  	<ProfileUser data={this.state.userData} 
					  			     update={this.updateProfile} 
					  			     openNav={this.openNav} 
					  			     closeNav={this.closeNav}
					  			     display={this.state.type}/>
					</div>

					<div className="container" id="main" style={{height: "auto", paddingTop: "75px"}}>
						<div className="text-center alert alert-dark" id="searchAlert">
							<p>No New Matches Available...</p>
						</div>
						<div className="text-center alert alert-info" id="pendingAlert">
							<p>Awaiting Match Approval by User...</p>
						</div>
						<br style={(this.state.type === 'employee') ? {display: ""} : {display: "none"}} />
						<div className="row" style={(this.state.type === 'employee') ? {display: "none"} : {display: ""}}> 
							<div className="col-md-8 text-center" style={{paddingTop: "5px"}}>
								<Dropdown textColor="black"/>
							</div>
							<div className="col-md-4 text-center" style={{marginBottom: '10px'}}>
								<button className="btn searchButt" onClick={() => this.searchMatches()}>SEARCH</button>
							</div>
						</div>
						<div className='row' style={{marginBottom: "25vh"}}>
							<div className="col-md-6" style={{marginBottom: "25px"}}>
								<Matches matches={this.state.userData.matches} 
										 pendingMatches={this.state.userData.pendingMatches}
										 type={this.state.type} 
										 toggle="modal" 
										 href='modal'
										 pendingClick={this.pendingClick}/>
							</div>							
							<div className="col-md-6">
								<Connections data={this.state.userData.connections} 
											 toggle="connections" 
											 href="connections"/>
							</div>
						</div>
						<ModalSwipe matches={this.state.userData.matches}
									pendingMatches={this.state.userData.pendingMatches}
									type={this.state.type}
									thumbsDown={this.thumbsDown}
									thumbsUp={this.thumbsUp}/>
					</div>
					<Footer hideText={this.state.id}/>
				</div>
			}
			</div>
		)
	}
}




export default PageUser;





