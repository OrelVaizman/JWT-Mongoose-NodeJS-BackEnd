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

// const checkUser = (req, res, next) => {
// 	const token = req.cookies.jwt;
// 	if (token) {
// 		jwt.verify(token, process.env.jwt_secret, async (err, decodedToken) => {
// 			if (err) {
// 				console.log(err.message);
// 				res.locals.user = null;
// 				next();
// 			} else {
// 				console.log(decodedToken);
// 				let user = await User.findById(decodedToken.id);
// 				res.locals.user = user;
// 				next();
// 			}
// 		});
// 	} else {
// 		res.locals.user = null;
// 		next();
// 	}
// };
