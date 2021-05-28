const miniUser = ({ _id, firstName, lastName, email }) => {
	return { _id, firstName, lastName, email };
};

const handleErrors = (error) => {
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
	if (error.name === 'ValidationError' || error.name === 'ValidatorError') {
		Object.keys(error.errors).forEach((key) => {
			errors[key] = error.errors[key].message;
		});
	}
	return errors;
};

const tokenExpirationSecs = 3 * 24 * 60 * 60;
const tokenExpirationMsecs = tokenExpirationSecs * 1000;

module.exports = {
	miniUser,
	handleErrors,
	tokenExpirationSecs,
	tokenExpirationMsecs,
};
