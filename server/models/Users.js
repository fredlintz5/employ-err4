const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

	linkedInId: String,
	displayName: String,
	image: String,
	title: String,
	bio: String,
	email: String,
	searchable: Boolean,
	skills: [],
	desiredSkills: [],
	matches: [],
	pendingMatches: [],
	connections: [],
	denied: [],
	type: String,
	website: String
});

const Users = mongoose.model('users', UserSchema);

module.exports = Users;