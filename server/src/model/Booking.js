import mongoose from "mongoose";

const Schema = mongoose.Schema;


const BookingSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	phoneNumber: {
		type: String,
		required: true
	},
	startDate: {
		type: Date,
		required: true
	},
	endDate: {
		type: Date,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	message: {
		type: String,
		required: true
	}
});

const Booking = mongoose.model('booking', BookingSchema);

export default Booking;
