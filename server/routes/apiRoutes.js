import express from 'express';
import Users from '../models/Users';

const router = express.Router();


// return specific user's database info for populating data in login page
router.get(`/users/user/:id`, (req, res) => {
	Users.find({linkedInId: req.params.id})
		.then(results => res.send(results))
		.catch((err) => { 
			res.status(500).send(err.message ? err.message : "Internal server blowup");
		})
});

// update profile page type
router.put(`/users/type/:id`, (req, res) => {
	Users.update({linkedInId: req.params.id},{ 
			$set: {type: req.body.type}
		})
		.then((results) => res.send('success'))
		.catch((err) => { 
			res.status(500).send(err.message ? err.message : "Internal server blowup");
		})
});

// update user profile input fields
router.put(`/users/profile/:id`, (req, res) => {
		console.log("hit the route" + req.body.email);

	Users.update({linkedInId: req.params.id}, 
			{ $set: { email: req.body.email, title: req.body.title,  bio: req.body.bio, website: req.body.website }})
		.then( results => res.send(results))
		.catch( err => res.status(500).send(err.message ? err.message : "Internal server blowup"))
});

//thumbs up route
router.put(`/users/thumbsup/:id/:type`, (req, res) => {
	if (req.params.type === "employer") {
		Users.update({linkedInId: req.params.id},{
				 $pull: {matches: {linkedInId: req.body.userData.matches[0].linkedInId}}, 
				 $push: {pendingMatches: req.body.userData.matches[0]}
			 })
			 .then(results => { 
				if (results) {
					let employerData = {
						linkedInId: req.body.userData.linkedInId,
		 				displayName: req.body.userData.displayName,
		 				image: req.body.userData.image,
		 				email: req.body.userData.email,
		 				title: req.body.userData.title.slice(0,35),
		 				bio: req.body.userData.bio.slice(0,35),
		 				type: req.body.userData.type
					}
					Users.update({linkedInId: req.body.userData.matches[0].linkedInId},{
							$push: {pendingMatches: employerData}
						 })
						 .then(result => res.send('success'))
						 .catch(err => console.log(err))
			    }
			 })
			 .catch(err => console.log(err))
	} else if (req.params.type === "employee") {
		Users.update({linkedInId: req.params.id},{
				 $pull: {pendingMatches: {linkedInId: req.body.userData.pendingMatches[0].linkedInId}}, 
				 $push: {connections: req.body.userData.pendingMatches[0]}
			 })
			 .then(results => { 
				if (results) {
					let employeeData = {
						linkedInId: req.body.userData.linkedInId,
		 				displayName: req.body.userData.displayName,
		 				image: req.body.userData.image,
		 				email: req.body.userData.email,
		 				title: req.body.userData.title.slice(0,35),
		 				bio: req.body.userData.bio.slice(0,35),
		 				type: req.body.userData.type
					}
					Users.update({linkedInId: req.body.userData.pendingMatches[0].linkedInId},{
							$pull: {pendingMatches: {linkedInId: req.params.id}},
							$push: {connections: employeeData}})
						 .then(result => res.send('success'))
						 .catch(err => console.log(err))
			    }
			 })
			 .catch(err => console.log(err))
	}
});

//thumbs down route
router.put(`/users/thumbsdown/:id/:type`, (req, res) => {
	if (req.params.type === "employer") {
		Users.update({linkedInId: req.params.id},
			{$pull: {matches: {linkedInId: req.body.userData.matches[0].linkedInId}}, 
			 $push: {denied: req.body.userData.matches[0]}})
			 .then(results => res.send('success'))
			 .catch(err => console.log(err))		
	} else if (req.params.type === "employee") {
		Users.update({linkedInId: req.params.id},
			{$pull: {pendingMatches: {linkedInId: req.body.userData.pendingMatches[0].linkedInId}}, 
			 $push: {denied: req.body.userData.pendingMatches[0]}})
			 .then(results => {
			 	if (results) {
			 		let employerData = {
						linkedInId: req.body.userData.linkedInId,
		 				displayName: req.body.userData.displayName,
		 				image: req.body.userData.image,
		 				email: req.body.userData.email,
		 				title: req.body.userData.title.slice(0,35),
		 				bio: req.body.userData.bio.slice(0,35),
		 				type: req.body.userData.type
					}
			 		Users.update({linkedInId: req.body.userData.pendingMatches[0].linkedInId}, {
							 $pull: {pendingMatches: {linkedInId: req.params.id}}})
			 			 .then(results => res.send('success'))
			 			 .catch(err => console.log(err)) 
			 	}
			 })
			 .catch(err => console.log(err)) 
	}
});

// searchMatches route to check against already existing linkedInId's in users matches array, and add any that aren't already there
router.put('/users/employees/:id', (req, res) => {
	Users.find({ $and : [
			{linkedInId: {$nin: req.body.matchedIds}}, 
			{linkedInId: {$nin: req.body.connectIds}}, 
			{linkedInId: {$nin: req.body.pendingIds}}, 
			{linkedInId: {$nin: req.body.deniedIds}}, 
			{type: 'employee'}
		 ]})
		 .then(results => {
		 	if (results.length > 0) {
		 		let newArray = results.map(user => {
		 			let matchedUser = {
		 				linkedInId: user.linkedInId,
		 				displayName: user.displayName,
		 				image: user.image,
		 				email: user.email,
		 				title: user.title.slice(0,35),
		 				bio: user.bio.slice(0,35),
		 				type: user.type
		 			}
		 			return matchedUser;
		 		})	
		 		Users.update({linkedInId: req.params.id}, {$push: {matches: {$each: newArray}}})
		 		 .then(result => res.send('success'))
				 .catch( err => res.status(500).send(err.message ? err.message : "Internal server blowup"))
		 	} else res.send('no new results')
		 })
		 .catch( err => res.status(500).send(err.message ? err.message : "Internal server blowup"))
});


//delete matches 
router.get('/users/user/matches/:id', (req, res) => {
	Users.update({linkedInId: req.params.id}, {$set: {matches: []}})
		 .then(result => {
		 	if (result.nModified === 1) {
		 		res.send('success')
		 	} else if (result.nModified === 0) {
		 		res.send('nothing to delete')
		 	} else {
		 		res.send('not sure what to do with this information...')	
		 	}
		 })
		 .catch(err => console.log(err))
})


// initial searchMatches route to return all users with type = 'employee', and add results to users matches
router.get('/users/employees/:id', (req, res) => {
	Users.find({type: 'employee'})
		 .then(results => {
		 	if (results.length > 0) {
		 		let newArray = results.map(user => {
		 			let matchedUser = {
		 				linkedInId: user.linkedInId,
		 				displayName: user.displayName,
		 				image: user.image,
		 				email: user.email,
		 				title: user.title.slice(0,35),
		 				bio: user.bio.slice(0,35),
		 				type: user.type
		 			}
		 			return matchedUser;
		 		})		 		
		 		Users.update({linkedInId: req.params.id}, {$push: {matches: {$each: newArray}}})
		 		 .then(result => res.send('success'))
				 .catch( err => res.status(500).send(err.message ? err.message : "Internal server blowup"))
		 	}
		 })
		 .catch( err => res.status(500).send(err.message ? err.message : "Internal server blowup"))
});




module.exports = router;





