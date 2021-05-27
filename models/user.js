const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { isEmail } = require('validator');
const userSchema = new mongoose.Schema(
	{
		firstName: {
			type: String,
			trim: true,
			required: [true, 'Please enter a first name.'],
			minlength: [2, 'First name must be at least 2 characters.'],
			maxlength: [255, 'First name cannot exceed 255 characters limit.'],
		},
		lastName: {
			type: String,
			trim: true,
			required: [true, 'Please enter a last name.'],
			minlength: [2, 'Last name must be at least 2 characters.'],
			maxlength: [255, 'Last name cannot exceed 255 characters limit.'],
		},
		email: {
			type: String,
			trim: true,
			required: [true, 'Please enter an email address.'],
			minlength: [5, 'Email address must be at least 5 characters.'],
			maxlength: [255, 'Email address cannot exceed 255 characters limit.'],
			unique: true,
			lowercase: true,
			validate: [isEmail, 'Please enter a valid email address.'],
		},
		password: {
			type: String,
			trim: true,
			required: [true, 'Please enter a password.'],
			minlength: [6, 'Password must be at least 6 characters.'],
			maxlength: [1024, 'Password cannot exceed 1024 characters limit.'],
		},
	},
	{ timestamps: true }
);

userSchema.pre('save', async function (next) {
	const user = this;
	if (user.isModified('password')) {
		const roundSalts = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(user.password, roundSalts);
	}
	next();
});

userSchema.statics.login = async function (email, password) {
	const user = this;
	const userFromDatabase = await user.findOne({ email });
	if (userFromDatabase) {
		const auth = await bcrypt.compare(password, userFromDatabase.password);
		if (auth) {
			return userFromDatabase;
		}
		throw Error('That password is incorrect!');
	}
	throw Error('That email is not registered in our system.');
};
module.exports = mongoose.model('User', userSchema);
