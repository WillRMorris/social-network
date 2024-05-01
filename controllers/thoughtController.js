const { Thought, User } = require('../models');

module.exports = {
    async getThoughts(req, res) {
      try {
        const thoughts = await Thought.find()
  
        res.json(thoughts);
      } catch (err) {
        console.error({ message: err });
        res.status(500).json(err);
      }
    },
    async getSingletThought(req, res) {
      try {
        const thought = await Thought.findOne({ _id: req.params.id })
  
        if (!thought) {
          return res.status(404).json({ message: 'No thought with that ID' });
        }
  
        res.json(thought);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // create a new thought
    async createThought(req, res) {
      try {
        const thought = await Thought.create(req.body);
        if (!thought) {
          return res.status(404).json({ message: 'No thought with that ID' });
        }
        const user = await User.updateOne(
          {_id: req.params.id}, 
          { $push: {thoughts: thought._id}},
          {new: true}
        );
        if (!user) {
          return res.status(404).json({ message: 'No user with that ID' });
        }
        res.status(202).json({ message:'thought was created sucessfully'});
      } catch (err) {
        console.log(err)
        res.status(500).json(err);
      }
    },

    // * `PUT` to update a thought by its `_id`
    async updateThought(req, res) {
      try {
        const thought = await Thought.updateOne({ _id: req.params.id }, req.body)
  
        if (!thought) {
          return res.status(404).json({ message: 'No thought with that ID' });
        }
  
        res.json(thought);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    
    // * `DELETE` to remove a thought by its `_id`
    async deleteThought(req, res) {
      try {
        const thought = await Thought.deleteOne({ _id: req.params.id });
  
        if (!thought) {
          return res.status(404).json({ message: 'No thought with that ID' });
        }
  
        res.json(thought);
      } catch (err) {
        res.status(500).json(err);
      }
    },

    // * `POST` to create a reaction stored in a single thought's `reactions` array field
    async addReaction(req, res) {
      try {
        const thought = await Thought.updateOne(
        { _id: req.params.thoughtId },
        {$addToSet: {reactions: req.body} },
        { runValidators: true, new: true }
      );
  
        if (!thought) {
          return res.status(404).json({ message: 'No thought with that ID' });
        }
  
        res.json(thought);
      } catch (err) {
        res.status(500).json(err);
      }
    },

    // * `DELETE` to pull and remove a reaction by the reaction's `reactionId` value
    async removeReaction(req, res) {
      try {
        const thought = await Thought.updateOne(
        { _id: req.params.thoughtId },
        {$pull: {reactions: req.body} },
        { runValidators: true, new: true }
      );
  
        if (!thought) {
          return res.status(404).json({ message: 'No thought with that ID' });
        }
  
        res.json(thought);
      } catch (err) {
        res.status(500).json(err);
      }
    },
  };
  




