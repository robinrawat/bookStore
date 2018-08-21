var mongoose = require('mongoose');

var signupSchema = mongoose.Schema({
	firstName:{
		type:String,
		required: true
	},
	lastName:{
		type:String,
		required: true
	},
	email:{
		type:String,
		required: true
	},
	password:{
		type:String,
		required: true
	},
	confirmPassword:{
		type:String,
		required: true
	},
	create_date:{
		type: Date,
		default: Date.now
	}
});

var Signup = module.exports = mongoose.model('Signup',signupSchema);


//login User

// module.exports.loginUser = function(email,callback){
// 	Signup.findOne(email,function);
// }

// Add user

module.exports.addUser = function(signup,callback){
		Signup.create(signup,callback);	
}

// Update user

// module.exports.updateUser = function(id,sign,options,callback){
// 	var query = {_id: id};
// 	var update ={
// 		name:sign.name
// 	}
// 	Sign.findOneAndUpdate(query,update,options,callback);
// }

// // delete user
// module.exports.deleteUser = function(id,callback){
// 	var query = {_id: id};
// 	Sign.remove(query,callback);
// }