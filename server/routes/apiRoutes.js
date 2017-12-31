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
		.then((results) => res.send(results))
		.catch((err) => { 
			res.status(500).send(err.message ? err.message : "Internal server blowup");
		})
});



// return all employee users from database
router.get('/users/employees/:id', (req, res) => {
	Users.find({type: "employee"})
		.then(results => {
			if (results) { 
				Users.update({linkedInId: req.params.id}, {$push: {matches: {$each: results}}})
					 .then(response => res.send(response.status))
					 .catch(err => console.log(err))
			}
		})
		.catch(err => { 
			res.status(500).send(err.message ? err.message : "Internal server blowup");
		})
});




module.exports = router;





