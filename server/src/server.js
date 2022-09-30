import app from "./app";
import mongoose from "mongoose";

const PORT = process.env.PORT || 4000 ;


const uri = "mongodb+srv://trip_admin:Rockstar123@cluster0.ji7lw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URL || uri,)
	.then(() => {
		console.log("DB IS CONNECTED")
		app.listen(PORT, () => {
			console.log(`Server is running on ${PORT}`);
		});
	});

