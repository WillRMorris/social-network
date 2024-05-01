const {Schema, model, Mongoose, Types} = require('mongoose');

//schema for reactions
const reactionSchema = new Schema({
    reactionId: { type: Schema.Types.ObjectId, default: new Types.ObjectId()},
    reactionBody: { type: String, required: true, maxLength: 200 },
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
},
);

module.exports = reactionSchema;