const { Thought, User } = require('../models');


module.exports = {
    async getUsers(req, res) {
      try {
        const users = await User.find()
          .populate([{ path: 'thoughts', select: '-__v' }, {path: 'friends', select: '-__v'}]);
  
        res.json(users);
      } catch (err) {
        console.error({ message: err });
        res.status(500).json(err);
      }
    },
    async getSingleUser(req, res) {
      try {
        const user = await User.findOne({ _id: req.params.id })
          .populate([{ path: 'thoughts', select: '-__v' }, {path: 'friends', select: '-__v'}]);
  
        if (!user) {
          return res.status(404).json({ message: 'No user with that ID' });
        }
  
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // create a new user
    async createUser(req, res) {
      try {
        const user = await User.create(req.body);
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    },

    //updates a user by its id
    async updateUser(req, res) {
      try {
        const user = await User.findOneAndUpdate({_id: req.params.id}, req.body, {new: true});
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    //deletes a user by its id
    async deleteUser(req, res) {
      try {
        const user = await User.deleteOne({ _id: req.params.id });
        if (!user) {
          return res.status(404).json({ message: 'No user with that ID' });
        }
  
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    //add a new friend to a user's friend list
    async addFriend(req, res) {
      try {
        const user = await User.updateOne(
          {_id: req.params.userId},
          {$push: {friends: req.params.friendId}}
        );

        res.json(update);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    
    // remove a friend from a user's friend list
    async removeFriend(req, res) {
      try {
        const user = await User.updateOne(
        {_id: req.params.userId},
        {$pull: {friends: req.params.friendId}}
        );

        res.json({message: update, removedId: removed});
      } catch (err) {
        res.status(500).json(err);
      }
    },
  };




