const Team = require('../models/team');
const isTeamManager = async (req, res, next) => {
	console.log('*** isTeamManager Authentication ***');
	const { teamId } = req.body;
	try {
		const team = await Team.findOne({
			_id: teamId,
			members: {
				$elemMatch: { userId: req.loggedInUserId, isManager: true },
			},
		});
		if (!team) {
			return res.status(401).send('You are not authorized to do this action!');
		} else {
			req.team = team;
			next();
		}
	} catch (err) {
		res.status(401).send(err.message);
	}
};

module.exports = {
	isTeamManager,
};
