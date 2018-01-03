import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';
import cookieSession from 'cookie-session';
import session from 'express-session';
import passport from 'passport';
import linkedInStrategy from './config/linkedInStrategy';
import apiRoutes from './routes/apiRoutes';
import authRoutes from './routes/authRoutes';


const db  = mongoose.connection;
const app = express();
const PORT = process.env.PORT || 8080;
const staticFiles = express.static(path.join(__dirname, '../../client/build'));


// DATABASE configuration for MONGOOSE 
const databaseUri = 'mongodb://localhost/employer';

if (process.env.MONGODB_URI) {
	mongoose.connect(process.env.MONGODB_URI, {useMongoClient: true})
} else {
	mongoose.connect(databaseUri, {useMongoClient: true});
}

mongoose.Promise = Promise;
mongoose.set('debug', true);

db.on('error', (err) => console.log('Mongoose Error: ', err));
db.once('open', () => console.log('Mongoose connection successful'));


app.use(session ({
	secret: 'arbitrary string', 
	resave: false,
	saveUnititialized: false
}))

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(staticFiles);

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', apiRoutes);
app.use('/auth', authRoutes);
// any routes not picked up by the server api will be handled by the react router
app.use('/*', staticFiles);





app.listen(PORT, () => console.log(`App listening on port: ${PORT}`));




