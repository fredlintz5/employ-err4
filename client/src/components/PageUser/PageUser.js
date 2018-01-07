import React, {Component} from 'react';

import Connections from '../Connections/Connections';
import ProfileUser from '../ProfileUser/ProfileUser';
import ModalSwipe from '../ModalSwipe/ModalSwipe';
import Navigator from '../Navigator/Navigator';
import Question from '../Question/Question';
import Dropdown from '../Dropdown/Dropdown';
import Matches from '../Matches/Matches';
import Footer from '../Footer/Footer';
import axios from 'axios';

import "../PageUser/PageUser.css";


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
		let url = window.location.href.slice(38);

		this.setState({type: type});
		axios.put(`/api/users/type/${url}`, {
          type: type
        })
	}

	getProfile = () => {
		let url = window.location.href.slice(38);

		axios('/api/users/user/' + url)
		.then(res => {
			if (res.data[0]) {
				this.setState({
					type: res.data[0].type,
					id: res.data[0].linkedInId,
					userData: res.data[0]
				})
			}
		})
	}

	updateProfile = () => {
		let bio     = document.getElementById('employee-bio').value || 
				  	  document.getElementById('employee-bio').placeholder;
		let title   = document.getElementById('employee-title').value  || 
					  document.getElementById('employee-title').placeholder;
		let email   = document.getElementById('employee-email').value || 
					  document.getElementById('employee-email').placeholder;
		let website = document.getElementById('employee-website').value || 
					  document.getElementById('employee-website').placeholder;

		axios.put(`/api/users/profile/${this.state.id}`, {
				bio: bio,
				title: title,
				email: email,
				website: website
				})
			 .then(response => {
				if (response.request.status === 200) {
					document.getElementById('employee-bio').value = "";
					document.getElementById('employee-title').value = "";
					document.getElementById('employee-email').value = "";
					document.getElementById('employee-website').value = "";
				this.getProfile();
				}
			  })
			 .catch(error => console.log(error));
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
		axios.put(`/api/users/thumbsdown/${this.state.id}/${this.state.type}`,{userData: this.state.userData})
			 .then(result => (
			 	result.data === 'success' 
				 	? this.getProfile() 
				 	: console.log("shit didnt work")))
			 .catch(err => console.log(err))
	}

	pendingClick = () => {
		document.getElementById("pendingAlert").style.marginTop = "0px";
 		document.getElementById("pendingAlert").style.opacity = "0.8";
 		setTimeout(() => {
 			document.getElementById("pendingAlert").style.marginTop = "-73px";
 			document.getElementById("pendingAlert").style.opacity = "0";
 		}, 2000)
	}

	deleteMatches = () => {
		axios(`/api/users/user/matches/${this.state.id}`)
			 .then(result => {
			 	if (result.data === "success") {
			 		this.getProfile()
			 	} else  if (result.data === "nothing to delete") {
			 		document.getElementById("deleteAlert").style.marginTop = "0px";
			 		document.getElementById("deleteAlert").style.opacity = "0.8";
			 		setTimeout(() => {
			 			document.getElementById("deleteAlert").style.marginTop = "-73px";
			 			document.getElementById("deleteAlert").style.opacity = "0";
			 		}, 2000)
			 	}
			 });
	}

	searchMatches = () => {
		let matchedIds = [];
		let pendingIds = [];
		let connectionIds = [];
		let deniedIds = [];

		if (this.state.userData.matches.length > 0 || this.state.userData.pendingMatches.length > 0 || this.state.userData.connections.length > 0 || this.state.userData.denied.length > 0) {
			
			matchedIds = this.state.userData.matches.map(match => match.linkedInId);
			pendingIds = this.state.userData.pendingMatches.map(pending => pending.linkedInId);
			connectionIds = this.state.userData.connections.map(connection => connection.linkedInId);
			deniedIds = this.state.userData.denied.map(denied => denied.linkedInId);

			axios.put(`/api/users/employees/${this.state.id}`,
				{
					matchedIds: matchedIds,
					pendingIds: pendingIds,
					connectIds: connectionIds,
					deniedIds: deniedIds,
				})
				 .then(result => {
				 	if (result.data === 'success') {
				 		this.getProfile()
				 	} else {
				 		document.getElementById("searchAlert").style.marginTop = "0px";
				 		document.getElementById("searchAlert").style.opacity = "0.8";
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

					<div className="container-fluid" id="main" style={{height: "auto", paddingTop: "75px"}}>
						<div className="row">
							<div className="col-md-1"></div>
							<div className="col-md-10 text-center alert alert-info hiddenAlert" id="searchAlert">
								<p>No New Matches Available...</p>
							</div>
							<div className="col-md-1"></div>
						</div>
						<div className="row">
							<div className="col-md-1"></div>
							<div className="col-md-10 text-center alert alert-info hiddenAlert" id="pendingAlert">
								<p>Awaiting Match Approval by User...</p>
							</div>
							<div className="col-md-1"></div>
						</div>
						<div className="row">
							<div className="col-md-1"></div>
							<div className="col-md-10 text-center alert alert-info hiddenAlert" id="deleteAlert">
								<p>No more matches to delete...</p>
							</div>
							<div className="col-md-1"></div>
						</div>
						<br style={(this.state.type === 'employee') ? {display: ""} : {display: "none"}} />
						<div className="row" style={(this.state.type === 'employee') ? {display: "none"} : {display: ""}}> 
							<div className="col-md-1"></div>
							<div className="col-md-5 text-center" style={{paddingTop: "5px"}}>
								<Dropdown textColor="#ee5f46"/>
							</div>
							<div className="col-md-5 text-center" style={{marginBottom: '10px'}}>
								<button className="btn searchButtons" onClick={() => this.searchMatches()}>SEARCH</button>
								<button className="btn searchButtons" onClick={() => this.deleteMatches()}>DELETE</button>
							</div>
							<div className="col-md-1"></div>
						</div>
						<div className='row' style={{marginBottom: "25vh"}}>
							<div className="col-md-1"></div>
							<div className="col-md-5" style={{marginBottom: "25px"}}>
								<Matches matches={this.state.userData.matches} 
										 pendingMatches={this.state.userData.pendingMatches}
										 type={this.state.type} 
										 toggle="modal" 
										 href='modal'
										 pendingClick={this.pendingClick}/>
							</div>							
							<div className="col-md-5">
								<Connections data={this.state.userData.connections} 
											 toggle="connections" 
											 href="connections"/>
							</div>
							<div className="col-md-1"></div>
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




