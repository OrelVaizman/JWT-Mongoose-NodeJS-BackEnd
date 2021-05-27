const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { miniUser, tokenExpirationSecs, tokenExpirationMsecs, handleErrors } = require('../utils/utils');

const _createToken = (id) => {
	return jwt.sign({ id }, process.env.jwt_secret, {
		expiresIn: tokenExpirationSecs,
	});
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
		res.cookie('jwt', token, { httpOnly: true, maxAge: tokenExpirationMsecs });
		res.status(201).send(miniUser(savedUser));
	} catch (err) {
		const errors = handleErrors(err);
		res.status(400).send(errors);
	}
};

const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.login(email, password);
		const token = _createToken(user._id);
		res.cookie('jwt', token, { httpOnly: true, maxAge: tokenExpirationMsecs });
		res.status(200).send(miniUser(user));
	} catch (err) {
		const errors = handleErrors(err);
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
