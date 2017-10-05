const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const validator = require('validator');

const userSchema = new Schema({
	name: {
		type: String,
		required: 'Please Supply a Name',
		trim: true
	},
	surname: {
		type: String,
		required: 'Please Supply a Last Name',
		trim: true
	},
	age: {
		type: Number
	},
	email: {
		type: String,
		unique: true,
		lowercase: true,
		trim: true,
		validate: [validator.isEmail, 'Invalid Email Address'],
		required: 'Please Supply an Email Address'
	},
	gender: {
		type: String,
		trim: true
	}
});

module.exports = mongoose.model('User', userSchema);
