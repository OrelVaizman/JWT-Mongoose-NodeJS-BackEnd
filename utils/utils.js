const miniUser = ({ _id, firstName, lastName, email }) => {
	return { _id, firstName, lastName, email };
};

const _tokenExpirationSecs = 3 * 24 * 60 * 60;
const _tokenExpirationMsecs = _tokenExpirationSecs * 1000;

module.exports = {
	miniUser,
	_tokenExpirationSecs,
	_tokenExpirationMsecs,
};
