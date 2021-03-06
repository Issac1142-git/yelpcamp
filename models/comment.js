const mongoose = require("mongoose");
const User = require("./user")

//comment schema

const commentSchema =new mongoose.Schema({
    text: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});                                    

module.exports = mongoose.model("Comment", commentSchema);