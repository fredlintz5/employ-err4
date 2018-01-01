import express from 'express';
import passport from 'passport';

const router = express.Router();
const homePage = process.env.HOME || 'http://localhost:3000/';
const loginPage = process.env.LOGIN || 'http://localhost:3000/user/';



// employer linkedin authentication
router.get('/linkedin', 
	passport.authenticate('linkedin', { state: 'some state' }),
  	(req, res) => {
    // The request will be redirected to Linkedin for authentication, so this
    // function will not be called.
  });


// linkedin redirect after authentication
router.get('/linkedin/callback',
	passport.authenticate('linkedin', { failureRedirect: homePage }),
	(req, res) => res.redirect(loginPage + req.user.linkedInId)
);


// logout linkedIn user and return to home page
router.get('/logout', (req, res) => {
	// req.logout()
	res.redirect(homePage)
})



module.exports = router;




