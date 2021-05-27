const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please enter a team name.'],
		minLength: 1,
	},
	members: [
		{
			_id: false,
			userId: {
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
			isManager: {
				type: Boolean,
			},
		},
	],
});

module.exports = mongoose.model('Team', teamSchema);
