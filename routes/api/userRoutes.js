const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    addFriend,
    deleteUser,
    removeFriend,
    updateUser
}= require('../../controllers/userController');
const thoughts = require('../../controllers/thoughtController');

router.route('/').get(getUsers).post(createUser);

router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser);

router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;
