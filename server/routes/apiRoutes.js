import express from 'express';
import Users from '../models/Users';

const router = express.Router();


// return specific employee's database info for populating data in login page
router.get(`/users/:id`, (req, res) => {
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



// return all employees from database
router.get('/users', (req, res) => {
	Users.find({})
		.then((results) => res.send(results))
		.catch((err) => { 
			res.status(500).send(err.message ? err.message : "Internal server blowup");
		})
});




module.exports = router;





