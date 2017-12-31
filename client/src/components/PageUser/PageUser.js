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
		allData: {},
		matches: [],
		connections: [],
		denied: [],
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
					allData: res.data[0],
					matches: res.data[0].matches,
					connections: res.data[0].connections,
					denied: res.data[0].denied
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

	displayBreak = () => {
		if (this.state.type === "" || this.state.type === 'employee') {		
			return '';
		} else {
			return "none";
		}
	}

	displayRow = () => {
		if (this.state.type === "" || this.state.type === 'employee') {		
			return 'none';
		} else {
			return "";
		}
	}

	thumbsUp

	searchMatches = () => {
		let matchedIds = [];

		if (this.state.matches.length > 0) {
			matchedIds = this.state.matches.map(match => match.linkedInId);
			
			axios.put(`/api/users/employees/${this.state.id}`,{linkedInArray: matchedIds})
				 .then(result => {
				 	if (result.data === 'success') {
				 		this.getProfile()
				 	} else {
				 		document.getElementById("alert").style.marginTop = "0px";
				 		document.getElementById("alert").style.opacity = "1";
				 		setTimeout(() => {
				 			document.getElementById("alert").style.marginTop = "-73px";
				 			document.getElementById("alert").style.opacity = "0";
				 		}, 2000)
				 		console.log('No new Results')
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
					  	<ProfileUser data={this.state.allData} 
					  			     update={this.updateProfile} 
					  			     openNav={this.openNav} 
					  			     closeNav={this.closeNav}
					  			     display={this.state.type}/>
					</div>

					<div className="container" id="main" style={{height: "auto", paddingTop: "75px"}}>
						<div className="text-center alert alert-dark" id="alert">
							<p>No New Matches Available...</p>
						</div>
						<br style={{display: this.displayBreak()}} />
						<div className="row" style={{display: this.displayRow()}}> 
							<div className="col-md-8 text-center" style={{paddingTop: "5px"}}>
								<Dropdown textColor="black"/>
							</div>
							<div className="col-md-4 text-center" style={{marginBottom: '10px'}}>
								<button className="btn searchButt" onClick={() => this.searchMatches()}>SEARCH</button>
							</div>
						</div>
						<div className='row' style={{marginBottom: "25vh"}}>
							<div className="col-md-6" style={{marginBottom: "25px"}}>
								<Matches data={this.state.matches} 
										 employee='employers' 
										 toggle="modal" 
										 href='#swipeModal'/>
							</div>							
							<div className="col-md-6">
								<Connections data={this.state.connections} 
											 toggle="" 
											 href="mailto:"/>
							</div>
						</div>
						<br />
						<ModalSwipe data={this.state.matches}/>
					</div>
					<Footer />
				</div>
			}
			</div>
		)
	}
}




export default PageUser;





