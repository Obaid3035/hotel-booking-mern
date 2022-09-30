import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;


const UserSchema = new Schema({
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
});


UserSchema.pre("save", async function ( next ) {
	const user = this;
	if (user.password && user.isNew) {
		this.password = await bcrypt.hash(user.password, 10)
		next()
	}
})

UserSchema.statics.userExist = async function ({ email }){
	const user = await User.findOne({ email });
	if (user) {
		throw new Error('User already exist');
	}
	return true;
}


UserSchema.statics.authenticate = async function (credentials){
	console.log(credentials)
	const user = await User.findOne({
		email: credentials.email,
		role: credentials.role
	});

	if (!user) {
		throw new Error('Unable to login. Please registered yourself');
	}
	const isMatch = await bcrypt.compare(credentials.password, user.password);

	if (!isMatch) {
		throw new Error('Email or Password is incorrect');
	}
	return user;
}

UserSchema.methods.generateAuthToken = async function () {
	const user = this;
	return jwt.sign({_id: user.id.toString()}, 'secret');
}

const User = mongoose.model('user', UserSchema);

export default User;
