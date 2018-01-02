import express from 'express';
import Users from '../models/Users';

const router = express.Router();


// return specific employee's database info for populating data in login page
router.get(`/users/user/:id`, (req, res) => {
	Users.find({linkedInId: req.params.id})
		.then(results => res.send(results))
		.catch((err) => { 
			res.status(500).send(err.message ? err.message : "Internal server blowup");
		})
});

// update profile page type
router.put(`/users/type/:id`, (req, res) => {
	Users.update({linkedInId: req.params.id}, 
			{ $set: { 
				type: req.body.type
			}})
		.then((results) => res.send(results))
		.catch((err) => { 
			res.status(500).send(err.message ? err.message : "Internal server blowup");
		})
});

// update user profile input fields
router.put(`/users/profile/:id`, (req, res) => {
	Users.update({linkedInId: req.params.id}, 
			{ $set: { 
				
			}})
		.then( results => res.send(results))
		.catch( err => res.status(500).send(err.message ? err.message : "Internal server blowup"))
});

//thumbs up route
router.put(`/users/thumbsup/:id`, (req, res) => {
	Users.update({linkedInId: req.params.id},
		{$pull: {matches: {linkedInId: req.body.match.linkedInId}}, 
		 $push: {connections: req.body.match}})
		 .then(results => { 
		 	res.send('success');
		 	console.log(results);
			// if (results) {
			// 	Users.update({linkedInId: req.body.match.linkedInId}, 
			// 		 {$push: {matches: req.body.match}})
			// 		 .then(result => res.send('success'))
			// 		 .catch(err => console.log(err))
		 //    }
		})
		 .catch(err => console.log(err))	
});

//thumbs down route
router.put(`/users/thumbsdown/:id`, (req, res) => {
	Users.update({linkedInId: req.params.id},
		{$pull: {matches: {linkedInId: req.body.match.linkedInId}}, 
		 $push: {denied: req.body.match}})
		 .then(results => { 
		 	res.send('success');
		 	console.log(results);
		 	// console.log(results)
			// if (results) {
			// 	Users.update({linkedInId: req.params.id}, 
			// 		 {$push: {denied: req.body.match}})
			// 		 .then(result => res.send('success'))
			// 		 .catch(err => console.log(err))
		 //    }
		})
		 .catch(err => console.log(err))		 
});


// PUT ROUTE TO check against already existing linkedInId's in users matches array, and add any that aren't already there
router.put('/users/employees/:id', (req, res) => {
	Users.find({ $and : [{linkedInId: {$nin: req.body.linkedInArray}},{type: 'employee'}]})
		 .then(results => {
		 	if (results.length > 0) {
		 		Users.update({linkedInId: req.params.id}, {$push: {matches: {$each: results}}})
		 		 .then(result => res.send('success'))
				 .catch( err => res.status(500).send(err.message ? err.message : "Internal server blowup"))
		 	} else res.send('no new results')
		 })
		 .catch( err => res.status(500).send(err.message ? err.message : "Internal server blowup"))
});


// Initial fetch for all users with type = 'employee', and add results to users matches
router.get('/users/employees/:id', (req, res) => {
	Users.find({type: 'employee'})
		 .then(results => {
		 	if (results.length > 0) {
		 		Users.update({linkedInId: req.params.id}, {$push: {matches: {$each: results}}})
		 		 .then(result => res.send('success'))
				 .catch( err => res.status(500).send(err.message ? err.message : "Internal server blowup"))
		 	}
		 })
		 .catch( err => res.status(500).send(err.message ? err.message : "Internal server blowup"))
});




module.exports = router;





