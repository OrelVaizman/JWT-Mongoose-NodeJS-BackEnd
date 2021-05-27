const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { miniUser, _tokenExpirationSecs, _tokenExpirationMsecs } = require('../utils/utils');

const _createToken = (id) => {
	return jwt.sign({ id }, process.env.jwt_secret, {
		expiresIn: _tokenExpirationSecs,
	});
};

const _handleErrors = (error) => {
	console.log(error);
	let errors = {};
	if (error.code === 11000) {
		errors.email = 'That Email is already registered in our system.';
	}
	if (error.message === 'That email is not registered in our system.') {
		errors.email = error.message;
	}
	if (error.message === 'That password is incorrect!') {
		errors.password = error.message;
	}
	if (error.name === 'ValidationError') {
		Object.keys(error.errors).forEach((key) => {
			errors[key] = error.errors[key].message;
		});
	}
	return errors;
};

const register = async (req, res) => {
	const { firstName, lastName, email, password, confirmPassword } = req.body;
	if (password !== confirmPassword) {
		return res.status(400).send({ password: 'The Password does not match the confirmation password.' });
	}
	try {
		const savedUser = await User.create({
			firstName,
			lastName,
			email,
			password,
		});
		const token = _createToken(savedUser._id);
		res.cookie('jwt', token, { httpOnly: true, maxAge: _tokenExpirationMsecs });
		res.status(201).send(miniUser(savedUser));
	} catch (err) {
		const errors = _handleErrors(err);
		res.status(400).send(errors);
	}
};

const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.login(email, password);
		const token = _createToken(user._id);
		res.cookie('jwt', token, { httpOnly: true, maxAge: _tokenExpirationMsecs });
		res.status(200).send(miniUser(user));
	} catch (err) {
		const errors = _handleErrors(err);
		res.status(400).send(errors);
	}
};

const logout = (req, res) => {
	res.cookie('jwt', '', { maxAge: 1 });
	res.status(200).send('Logged out!');
};

module.exports = {
	register,
	login,
	logout,
};
