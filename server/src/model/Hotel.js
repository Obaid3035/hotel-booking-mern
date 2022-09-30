import mongoose from "mongoose";

const Schema = mongoose.Schema;


const HotelSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	price: {
		type: String,
		required: true
	},
	currency: {
		type: String,
		required: true
	},
	avatar: {
		avatar: String,
		cloudinary_id: String
	},
	images: [
		{
			avatar: String,
			cloudinary_id: String
		}
	],
	description: {
		type: String,
	},
	ownerDescription: {
		type: String,
	},
	deposit: {
		type: String
	},
	cleaning: {
		type: String
	},
	tax: {
		type: String
	},
	tourist: {
		type: String
	},
	ownerName: {
		type: String
	},
	bookingReference: {
		type: String
	},
	amenities: [
		{
			type: String
		}
	],

	accountDetails: {
		type: String,
		required: true
	}

});

const Hotel = mongoose.model('hotel', HotelSchema);

export default Hotel;
