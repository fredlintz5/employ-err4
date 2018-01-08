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
		profileOpen: false
	}

	// grab all data about user before component mounts
	componentWillMount() {
		this.getProfile();
	}

	// jquery-like shorthand for replacing document.getElementById
	byId = (id) => document.getElementById(id)

	// get user's profile data please...
	getProfile = () => {
		axios.get('/api/users/user/' + window.location.href.slice(27))
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

	// depending on state of profileOpen, toggle side-profile open or closed
	// this function is used in the Navigator and ProfileUser
	toggleNav = (state) => {
		if (state === false) {
			this.byId("mySidenav").style.width = "375px";
			this.byId("main").style.opacity = "0.15";
			this.byId('main').style.pointerEvents = 'none';
			this.byId('root').classList.add("stop-scrolling");
			this.byId('caretDiv').style.transform ="rotate(-540deg)";
			this.byId('caretDiv').style.left = "375px";
			this.setState({profileOpen: true})
		} else {
			this.byId("mySidenav").style.width = "0px";
			this.byId("main").style.opacity = "1.0";
			this.byId('main').style.pointerEvents = 'auto';
			this.byId('root').classList.remove("stop-scrolling");
			this.byId('caretDiv').style.transform = "rotate(0deg)";
			this.byId('caretDiv').style.left = "0px";
			this.setState({profileOpen: false})
		}
		
	}

	// delete current searchMatches results
	deleteMatches = () => {
		axios.get(`/api/users/user/matches/${this.state.id}`)
			 .then(result => {
			 	if (result.data === "success") {
			 		this.getProfile()
			 	} else  if (result.data === "nothing to delete") {
			 		this.byId("deleteAlert").style.marginTop = "0px";
			 		this.byId("deleteAlert").style.opacity = "0.8";
			 		setTimeout(() => {
			 			this.byId("deleteAlert").style.marginTop = "-73px";
			 			this.byId("deleteAlert").style.opacity = "0";
			 		}, 2000)
			 	}
			 });
	}

	// return potential employee matches for the employer
	searchMatches = () => {
		let matchedIds = [];
		let pendingIds = [];
		let connectionIds = [];
		let deniedIds = [];

		// if any of these arrays already have data, provide search results that take that data into consideration
		// ie - we dont want to return users in the search that have already been denied, pending or connected
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
				 		// toggle the searchAlert div, letting employer know, there are no new search results
				 		this.byId("searchAlert").style.marginTop = "0px";
				 		this.byId("searchAlert").style.opacity = "0.8";
				 		setTimeout(() => {
				 			this.byId("searchAlert").style.marginTop = "-73px";
				 			this.byId("searchAlert").style.opacity = "0";
				 		}, 2000)
				 	}
				 })
				 .catch(err => console.log(err))
			
		} else {
			// return all possible employees
			axios.get(`/api/users/employees/${this.state.id}`)
				 .then(result => (result.data === 'success') 
				 	? this.getProfile()
				 	: console.log("Something wrong with the searchMatches function"))
				 .catch(err => console.log(err))
		}
	}

	render () {
		return (
			<div>
			{this.state.type === "" ? <Question getProfile={this.getProfile}/> : 
				<div>
					<Navigator toggleNav={this.toggleNav} navOpen={this.state.profileOpen} none='none'/>

					<div id="mySidenav" className="sidenav" style={{zIndex: "2000"}}>
					  	<ProfileUser data={this.state.userData} 
					  			     update={this.updateProfile}
					  			     getProfile={this.getProfile} 
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
								<Dropdown location="employerSearch"/>
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
								<Matches userData={this.state.userData}  
										 toggle="modal" 
										 href='modal'/>
							</div>							
							<div className="col-md-5">
								<Connections userData={this.state.userData} 
											 toggle="connections" 
											 href="connections"/>
							</div>
							<div className="col-md-1"></div>
						</div>
						<ModalSwipe userData={this.state.userData}
									getProfile={this.getProfile}/>
					</div>
					<Footer hideText={true}/>
				</div>
			}
			</div>
		)
	}
}




export default PageUser;


