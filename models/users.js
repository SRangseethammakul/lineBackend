const mongoose = require('mongoose');
const mongo = require('mongodb');
const dbURL = process.env.DB_URL;
mongoose.connect(dbURL, {
    useNewUrlParser : true
});

const db = mongoose.connection;
const Schema = mongoose.Schema;
const userSchema = new Schema({
    id : {
        type : Schema.ObjectId
    },
    name : {
        type : String,
        require : true
    },
    Pstatus:  Boolean,
    created: { 
        type: Date, 
        default: Date.now 
    },
    updated: { 
        type: Date, 
        default: Date.now 
    },
});

const users = module.exports = mongoose.model("users", userSchema);
module.exports.createUser = (newUser, callBack) => {
    newUser.save(callBack);
}