const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    noteTitle : {
        type : String,
        required : true,
        trim : true
    },
    noteDescription : {
        type : String,
        required : true,
        trim : true
    },
    noteCategory : {
        type : String,
        default : "Task"
    },
    createdDate : {
        type : String,
        required : true,
        trim : true
    },
    noteOwnerID : {
        type : String,
        required : true,
        trim : true
    },
    noteStatus : {
        type : String,
        default : "Pending"
    }
});

module.exports = mongoose.model("Notes", noteSchema);
