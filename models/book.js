var mongoose = require('mongoose');

var bookSchema = mongoose.Schema({
	title:{
		type:String,
		required: true
	},
	genre:{
		type: String,
		required: true
	},
	author:{
		type: String,
		required: true
	},
	publisher:{
		type: String,
		required: true
	},
	pages:{
		type: String,
		required: true
	},
	description:{
		type: String,
		required: true
	},
	image_url:{
		type: String,
		required: true
	},
	buy_url:{
		type: String,
	},
	create_date:{
		type: Date,
		default: Date.now
	}
});

var Book = module.exports = mongoose.model('Book',bookSchema);

//Get Books

module.exports.getBooks = function(callback,limit){
	Book.find(callback).limit(limit);
}

module.exports.getBookById = function(id,callback){
	Book.findById(id,callback);
}
//Add Book
module.exports.addBook = function(book,callback){
	Book.create(book,callback);
}
//Update Book
module.exports.updateBooks = function(id,book,options,callback){
	var query = {_id: id};
	var update ={
		title:book.title,
		genre:book.genre,
		description:book.description
	}
	Book.findOneAndUpdate(query,update,options,callback);
}

// delete Genre
module.exports.deleteBooks = function(id,callback){
	var query = {_id: id};
	Book.remove(query,callback);
}