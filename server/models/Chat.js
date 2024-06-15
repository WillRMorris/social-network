const { Schema, model } = require('mongoose');

const chatSchema = new Schema({

    history: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Message'
        }
    ],

    chatName: {
        type: String,
        default: function () {
            let name = ``;
            for( let i = 0; i< this.users.length; i++){
                name += `${this.users[i]} `;
            }
            return name;
        } 
    },

    lastMessage:{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    },

    //usernames
    users: [
        {
            type: String,
            ref: 'User'
        }
    ],
    lastUpdate: {
        type: Number,
        default: 0,
      }
})

chatSchema.methods.getLastMessage = function() {
if(this.history.length && this.history.length > 0){
    this.lastMessage = this.history[this.history.length-1];
    this.save();
    return this.lastMessage;
} else {
    return null;
}

}

//checks to see if the chat history is getting too long and trims the oldest messages
chatSchema.methods.checkAndTrim = function() {
    if (this.history.length > 50){
        let r = this.history.length -50;
        let arr;
        for(let i = 0; i<r; i++){
           let temp = this.history.shift();
           this.save();
           arr.push(temp);
        }
        return arr;
    }else{
        return null;
    }
}


// this method is called whenever a pixel is updated by the user
chatSchema.methods.updateTime = function(){
    this.lastUpdate = Date.now();
    this.save();
  }


const Chat = model('Chat', chatSchema);

module.exports = Chat;