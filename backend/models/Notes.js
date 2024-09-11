const mongoose = require('mongoose');
const {Schema} = mongoose;

//Schema defines what data should stored in the db with data type
const NotesSchema = new Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  title : {
    type : String,
    required : true
  },
  description : {
    type : String,
    required : true
  },
  tag : {
    type : Array,
    default : "General"
  },
  date : {
    type : Date,
    default : Date.now
  }
});

module.exports = mongoose.model('notes', NotesSchema);