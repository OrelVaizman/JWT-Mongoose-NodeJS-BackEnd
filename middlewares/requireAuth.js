const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
	console.log('*** Requiring Authentication ***');
	const token = req.cookies.jwt;
	if (token) {
		jwt.verify(token, process.env.jwt_secret, (err, decodedToken) => {
			if (err) {
				return res.status(401).send(err.message);
			} else {
				console.log(decodedToken);
				req.loggedInUserId = decodedToken.id;
				next();
			}
		});
	} else {
		return res.status(401).send('You are not authorized to do this action!');
	}
};

module.exports = {
	requireAuth,
};