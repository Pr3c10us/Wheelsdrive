const getUserInfo = async (req, res) => {
    res.json(req.user);
};

const updateUserInfo = async (req, res) => {
    res.send('update user info');
};

const deleteUser = async (req, res) => {
    res.send('delete user');
};

const deleteGithubAuthToken = async (req, res) => {
    res.send('delete github auth token');
};

module.exports = {
    getUserInfo,
    updateUserInfo,
    deleteUser,
    deleteGithubAuthToken,
};
