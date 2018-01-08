import React, {Component} from 'react';
import axios from 'axios';

import Dropdown from '../Dropdown/Dropdown';

import "./../PageUser/PageUser.css"



class ProfileUser extends Component {

  // jquery-like shorthand for replacing document.getElementById
  byId = (id) => document.getElementById(id)

  updateProfile = () => {
    let bio     = this.byId('employee-bio').value || 
                  this.byId('employee-bio').placeholder;
    let title   = this.byId('employee-title').value  || 
                  this.byId('employee-title').placeholder;
    let email   = this.byId('employee-email').value || 
                  this.byId('employee-email').placeholder;
    let website = this.byId('employee-website').value || 
                  this.byId('employee-website').placeholder;

    axios.put(`/api/users/profile/${this.props.data.linkedInId}`, {
          bio: bio,
          title: title,
          email: email,
          website: website
        })
       .then(response => {
          if (response.request.status === 200) {
            this.byId('employee-bio').value = "";
            this.byId('employee-title').value = "";
            this.byId('employee-email').value = "";
            this.byId('employee-website').value = "";
            this.props.getProfile();
          }
        })
       .catch(error => console.log(error));
  }

  render() {

    let {image, displayName, title, email, bio, website} = this.props.data;

    return (
      <div className="container-fluid" style={{position: 'relative'}}>
        <div className="row">
          <div className="col-lg-12" >
            <div className="text-center">
              <img className="rounded-circle" src={image || "https://www.members.eyp.org/system/files/default_images/default-avatar_7.png"} height='200px' alt='profile pic'/>
            </div>
            <br />
            <div className="text-center">
              <h3 style={{color: "#F7F7F7"}}>{displayName || "Kip Dynamite"}</h3>
            </div>
            <hr className="my-4" style={{maxWidth: '90%'}}/>
            <form>
              <div className="form-group input-group">
                <div className="input-group-addon width82" >Title</div> 
                <input className="form-control" type="text" id="employee-title" placeholder={title || "Update your Title..."} />
              </div>
              <div className="form-group input-group">
                <div className="input-group-addon width82" >Email</div> 
                <input className="form-control" type="text" id="employee-email" placeholder={email || "Update your email..."} />
              </div>
              <div className="form-group input-group" style={{display: this.props.display === 'employee' ? 'none' : ""}}>
                <div className="input-group-addon width82" >Website</div> 
                <input className="form-control" type="text" id="employee-website" placeholder={website || "Update your website url"} />
              </div>
              <div className="form-group input-group">
                <div className="input-group-addon width82" >Bio</div> 
                <textarea className="form-control" rows={3} id="employee-bio" placeholder={bio || "Insert Catchy Bio here..."}/>
              </div>
            </form>
            <Dropdown location="ProfileUser"/>
            <button className='btn btn-outline-secondary btn-block' type='button' onClick={() => this.updateProfile()}>Update Profile</button>
         </div>
      </div>
    </div>
    );
  }
};


export default ProfileUser;

