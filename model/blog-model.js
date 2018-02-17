var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var blogSchema = new Schema({

	title : {type : String, required :true},

	content : {type : String, default : '', required : true},

	author : {type : String, required : true},

	created_on : {type : Date, default : Date.now},

	last_modification : {type : Date},

	comments : [{body : String, date : Date}]
});

var Blog = mongoose.model('Blog',blogSchema);

module.exports = Blog;