import User from "../model/user"
import Hotel from "../model/Hotel";
import cloudinary from "../utils/cloudinary";
import Booking from "../model/Booking";
import bookingConfirmation from "../lib/bookingConfirmation";

module.exports = {
	async index(req, res) {
		try {
			const hotels = await Hotel.find();
			res.status(200).json(hotels);
		} catch (e) {
			console.log(e);
			res.status(500).json(e);
		}
	},

	async show(req, res) {
		try {
			const hotelId = req.params.id;
			const hotel = await Hotel.findById(hotelId);
			res.status(200).json(hotel);
		} catch (e) {
			res.status(500).json(e);
		}
	},

	async update(req, res) {
		try {
			const hotelId = req.params.id;
			const hotel = await Hotel.findByIdAndUpdate(hotelId,  req.body);
			res.status(200).json(hotel);
		} catch (e) {
			console.log(e);
			res.status(500).json(e);
		}
	},

	async create(req, res) {
		try {
			const imagePromise = [];
			for (const i of req.files.images) {
				const image = cloudinary.v2.uploader.upload(i.path);
				imagePromise.push(image)
			}

			const imagesResolved = await Promise.all(imagePromise);

			const images = imagesResolved.map((img) => {
				return {
					avatar: img.secure_url,
					cloudinary_id: img.public_id
				}
			});

			const { avatar } = req.files;

			const avatarUploaded = await cloudinary.v2.uploader.upload(avatar[0].path)

			const body = {
				...req.body,
				images: images,
				amenities: JSON.parse(req.body.amenities),
				avatar: {
					avatar: avatarUploaded.secure_url,
					cloudinary_id: avatarUploaded.public_id,
				},
			}

			const hotels = await Hotel.create(body);
			res.status(200).json(hotels);
		} catch (e) {
			console.log(e);
			res.status(500).json(e);
		}
	},

	async createBooking(req, res) {
		try {
			await Booking.create(req.body.booking);
			await bookingConfirmation(
				req.body
			)
			res.status(200).json({
				saved: true
			});
		} catch (e) {
			res.status(500).json(e);
		}
	},

	async getAllBookings(req, res) {
		try {
			const booking = await Booking.find();
			res.status(200).json(booking);
		} catch (e) {
			res.status(500).json(e);
		}
	},

	async register(req, res, next) {
		try {
			const body = {
				...req.body,
				email: req.body.email.toLowerCase()
			}
			await User.userExist(body);
			const user = new User(body);
			await user.save();
			const token = await user.generateAuthToken();
			res.status(201).json({ token, saved: true, user });
		} catch (e) {
			console.log(e);
			next(e);
		}
	},
	async login(req, res, next) {
		try {
			const body = {
				...req.body,
				email: req.body.email.toLowerCase(),
			}
			const user = await User.authenticate(body);
			const token = await user.generateAuthToken();
			res.status(200).json({ user, token });
		} catch (e) {
			console.log(e);
			next(e);
		}
	},

	async deleteImage(req, res, next) {
		try {
			const hotel = await Hotel.findById(req.params.id);
			if (hotel.images.length > 1) {
				const deleteImage = await cloudinary.v2.uploader.destroy(
					req.body.cloudinary_id
				);
				if (deleteImage) {
					const hotel = await Hotel.findById(req.params.id);
					const images = hotel.images.concat();
					const imageIndex = images.findIndex(img => img._id.toString() === req.body.image_id.toString())
					images.splice(imageIndex, 1);
					await Hotel.findByIdAndUpdate(req.params.id, {
						images: images
					})
					res.status(200).json({
						deleted: true
					});
				} else {
					res.status(400).json({
						deleted: false
					});
				}
			} else {
				res.status(400).json({
					message: "Atleast one image is required"
				});
			}


		} catch (e) {
			console.log(e);
			next(e);
		}
	},

	async uploadImages(req, res, next) {
		try {
			const imagePromise = [];
			for (const i of req.files.images) {
				const image = cloudinary.v2.uploader.upload(i.path);
				imagePromise.push(image)
			}

			const imagesResolved = await Promise.all(imagePromise);

			const mappedImages = imagesResolved.map((img) => {
				return {
					avatar: img.secure_url,
					cloudinary_id: img.public_id
				}
			});
			const hotel = await Hotel.findById(req.params.id);
			let images = hotel.images.concat();
			images = [
				...images,
				...mappedImages
			]
			await Hotel.findByIdAndUpdate(req.params.id, {
				images: images
			})
			res.status(200).json({
				saved: true
			})
		} catch (e) {
			next(e);
		}
	}
}
