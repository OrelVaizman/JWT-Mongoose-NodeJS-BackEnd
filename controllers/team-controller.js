const Team = require('../models/team');
const User = require('../models/user');
const Mongoose = require('mongoose');
const create = async ({ body, loggedInUserId }, res) => {
	const { name } = body;
	try {
		const team = await Team.create({ name, members: [{ userId: loggedInUserId, isManager: true }] });
		res.status(200).send(team);
	} catch (err) {
		console.log(err);
		res.status(400).send(err);
	}
};

const addMember = async ({ team, body }, res) => {
	const { userId } = body;
	try {
		const user = await User.findById(userId);
		if (!user) {
			res.status(400).send('The user does not exist in our system!');
		} else {
			team.members.addToSet({ userId, isManager: false });
		}
		await team.save();
		res.status(200).send(team);
	} catch (err) {
		res.status(400).send(err.message);
	}
};

const updateMember = async ({ body, team }, res) => {
	let { userId, teamId, isManager } = body;
	userId = typeof userId === 'string' ? userId : userId.toString();
	const updatedMembers = team.members.map((member) =>
		member.userId.toString() === userId ? { userId, isManager } : member
	);
	try {
		const updatedTeam = await Team.findByIdAndUpdate({ _id: teamId }, { members: updatedMembers }, { new: true });
		res.status(200).send(updatedTeam);
	} catch (err) {
		res.status(400).send(err.message);
	}
};

const deleteTeam = async ({ team }, res) => {
	try {
		const deletedTeam = await team.delete();
		res.status(200).send(deletedTeam);
	} catch (err) {
		res.status(400).send(err.message);
	}
};

const deleteMember = async ({ team, loggedInUserId, body }, res) => {
	let { userId, teamId } = body;
	userId = typeof userId === 'string' ? userId : userId.toString();
	if (userId === loggedInUserId) {
		res.status(400).send('You cannot remove yourself from the team!');
	} else {
		const updatedMembers = team.members.filter((member) => member.userId.toString() !== userId);
		const updatedTeam = await Team.findByIdAndUpdate({ _id: teamId }, { members: updatedMembers }, { new: true });
		res.status(200).send(updatedTeam);
	}
};

module.exports = {
	create,
	addMember,
	updateMember,
	deleteTeam,
	deleteMember,
};
