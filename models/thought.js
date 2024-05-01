const {Schema, model, Mongoose, Types} = require('mongoose');
const reactionSchema = require('./reaction');
//schema for thoughts
const thoughtSchema = new Schema({
    thoughtText: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    username: { type: String, required: true },
    reactions: [reactionSchema],
},

);

// Uses mongoose.model() to create model
const Thought = model('thought', thoughtSchema);


module.exports = Thought;
