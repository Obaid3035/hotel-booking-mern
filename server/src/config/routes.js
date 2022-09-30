import express from "express";
import hotelController from "../controller/api.controller";
import upload from "../middleware/multer";
import userController from "../controller/api.controller";

const router = express.Router();

const uploadMultiple = upload.fields([
	{ name: 'images', maxCount: 10 },
	{ name: 'avatar', maxCount: 1 },
]);

router.get('/admin/hotel', hotelController.index);
router.post('/admin/hotel', uploadMultiple, hotelController.create);
router.get('/admin/hotel/:id', hotelController.show);
router.put('/admin/hotel/:id', hotelController.update);
router.post('/booking', hotelController.createBooking);
router.get('/admin/booking', hotelController.getAllBookings);
router.post('/register' , userController.register);
router.post('/login' , userController.login);
router.post('/images/:id', userController.deleteImage);
router.put('/upload-images/:id', uploadMultiple,userController.uploadImages);

export default router;
