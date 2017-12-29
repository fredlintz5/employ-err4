import express from 'express';
import passport from 'passport';

const router = express.Router();



// employer linkedin authentication
router.get('/linkedin', 
	passport.authenticate('linkedin', { state: 'some state' }),
  	(req, res) => {
    // The request will be redirected to Linkedin for authentication, so this
    // function will not be called.
  });


// linkedin redirect after authentication
router.get('/linkedin/callback',
	passport.authenticate('linkedin', { failureRedirect: 'http://localhost:3000/' }),
	(req, res) => res.redirect(`http://localhost:3000/user/${req.user.linkedInId}`)
);


// logout linkedIn user and return to home page
router.get('/logout', (req, res) => {
	req.session.destroy(err => {
		if(err) return next(err)

		req.logout()
		res.redirect('http://localhost:3000/')
	})
})



module.exports = router;




