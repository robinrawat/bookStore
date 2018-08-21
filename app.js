var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


app.use(express.static(__dirname+'/client'));
app.use(bodyParser.json());


Book=require('./models/book'); 
Signup=require('./models/signup');

var MONGODB_URI = "mongodb://localhost:27017/bookstore";
// mongoose.connect('mongodb://localhost/bookstore');
// var db = mongoose.connection;
mongoose.connect(MONGODB_URI);
// on successful connection
mongoose.connection.on('connected',()=>{
	console.log('Connected to MongoDB @ 27017');
});
//on connection error
mongoose.connection.on('error',(err)=>{
	if(err){
		console.log('Error in DB connection: ' + err);
	}
});

app.get('/',function(req,res){
	res.send('please use /api/books or /api/genres');
});

// app.get('/api/genres',function(req, res){
// 	Genre.getGenres(function(err, genres){
// 		if(err){
// 			throw err;
// 		}
// 		res.json(genres);
// 	});
// });

// app.post('/api/genres',function(req, res){
// 	var genre = req.body;
// 	Genre.addGenres(genre,function(err, genre){
// 		if(err){
// 			throw err;
// 		}
// 		res.json(genre);
// 	});
// });

// app.put('/api/genres/:_id',function(req, res){
// 	var id = req.params._id;
// 	var genre = req.body;
// 	Genre.updateGenres(id,genre,{},function(err, genre){
// 		if(err){
// 			throw err;
// 		}
// 		res.json(genre);
// 	});
// });

// app.delete('/api/genres/:_id',function(req, res){
// 	var id = req.params._id;
// 	var genre = req.body;
// 	Genre.deleteGenres(id,function(err, genre){
// 		if(err){
// 			throw err;
// 		}
// 		res.json(genre);
// 	});
// });

app.get('/api/books',function(req, res){
	Book.getBooks(function(err, books){
		if(err){
			throw err;
		}
		res.json(books);
	});
});

app.get('/api/books/:_id',function(req, res){
	Book.getBookById(req.params._id,function(err, book){
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.post('/api/books',function(req, res){
	var book = req.body;
	Book.addBook(book,function(err, book){
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.put('/api/books/:_id',function(req, res){
	var id = req.params._id;
	var book = req.body;
	Book.updateBooks(id,book,{},function(err, book){
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.delete('/api/books/:_id',function(req, res){
	var id = req.params._id;
	var book = req.body;
	Book.deleteBooks(id,function(err, book){
		if(err){
			throw err;
		}
		res.json(book);
	});
});

app.post('/api/signups',function(req,res){
	var signup = req.body;
	Signup.addUser(signup,function(err,signup){
		if(err){
			throw err;
		}
		res.json(signup);
	})
})

app.post('/api/logins',function(req, res){
	Signup.findOne({email : req.body.email}, function(err, user){
		if(user === null){
			console.log(err);
			console.log("No such user found !");
			return res.status(400).send({
				message: "User not found."
			});
		} else {
			if(user.password === (req.body.password)){
				console.log("User logged in");
				//var token = user.generateJwt();
				return res.status(201).send({
					message: "User Logged In",
					displayName: user.first_name + " " + user.last_name,
					//token: token,
					id: user.id
				});
			} else {
				console.log("Wrong password");
				return res.status(400).send({
					message: "Wrong Password"
				});
			}
		}
	});
});

app.listen(3000);
console.log('running...');