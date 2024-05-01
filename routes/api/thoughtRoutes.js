const router = require('express').Router();
const {
    getThoughts,
    getSingletThought,
    updateThought,
    deleteThought,
    createThought,
    addReaction,
    removeReaction,
} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts);

//id varies based on what you are doing the post route requires a users id, the rest require a thought id
router.route('/:id').get(getSingletThought).put(updateThought).delete(deleteThought).post(createThought);

router.route('/:thoughtId/reactions').post(addReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);
module.exports = router;
