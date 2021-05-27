const express = require('express');
const { create, addMember, updateMember, deleteTeam, deleteMember } = require('../controllers/team-controller');
const { requireAuth } = require('../middlewares/requireAuth');
const { isTeamManager } = require('../middlewares/isTeamManager');
const router = express.Router();

router.post('/', requireAuth, create);
router.delete('/', requireAuth, isTeamManager, deleteTeam);
router.post('/addmember', requireAuth, isTeamManager, addMember);
router.put('/updatemember', requireAuth, isTeamManager, updateMember);
router.delete('/deletemember', requireAuth, isTeamManager, deleteMember);

module.exports = router;
