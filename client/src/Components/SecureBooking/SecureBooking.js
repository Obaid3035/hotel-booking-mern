import React, { useState } from 'react'
import { Card, Col, Form, Row, Spinner } from 'react-bootstrap'
import '../SecureBooking/SecureBooking.css'
import { AiFillLock } from 'react-icons/ai'
import moment from "moment";
import axios from "axios";
import { successNotify } from "../../utils/toast";

const SecureBooking = ({ personalInfo, setPersonalInfo, formInput, daysCount, setStep, image, hotel, currency }) => {
	const onChangeHandler = (e) => {
		const { name, value } = e.target
		console.log(name, value)
		setPersonalInfo({
			...personalInfo,
			[name]: value
		})
	}

	const sumOfCharges = () => {
		return parseInt(formInput.price) + parseInt(hotel.tourist) + parseInt(hotel.tax) + parseInt(hotel.cleaning) + parseInt(hotel.deposit)
	}

	const [isLoading, setIsLoading] = useState(false);

	const onFormSubmit = (e) => {
		e.preventDefault();
		const formData = {
			booking: {
				...personalInfo,
				startDate: formInput.startDate,
				endDate: formInput.endDate
			},
			hotelName: hotel.name,
			guestCount: formInput.guestCount,
			total: sumOfCharges(),
			image: image.original,
			currency: currency,
			bookingReference: hotel.bookingReference


		}
		setIsLoading(true)
		axios.post("/booking", formData)
			.then(() => {
				setIsLoading(false)
				setStep(2)
				successNotify("Successfully created booking")
			})
			.catch(() => {
				setIsLoading(false)
			})
	}

	return (
		<Row className="Main_Container">

			<h3><AiFillLock className='lock_icon' /> Your Secure Booking</h3>
			<small>The owner has 24 hours to accept your booking.If it is accepted we will charge your account for the
				amount authorized</small>

			<Col md={8} className="mt-3">
				<Form onSubmit={onFormSubmit}>
					<div className='form_container'>


						<div className="title_arrow_number mt-1">1</div>

						<h3>Your information</h3>
						<Row>

							<Col md={6} className="mt-3">
								<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
									<Form.Label>Your Full Name <sup className="color_red">*</sup> </Form.Label>
									<Form.Control name={"name"} required onChange={onChangeHandler} type="text"
										placeholder="Enter Full Name" />
								</Form.Group>
							</Col>

							<Col md={6} className="mt-3">
								<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
									<Form.Label>Phone number <sup className='color_red'>*</sup></Form.Label>
									<Form.Control name={"phoneNumber"} required onChange={onChangeHandler} type="number"
										placeholder="Enter Number" />
								</Form.Group>
							</Col>

							<Col md={6}>
								<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
									<Form.Label>E-mail address <sup className='color_red'>*</sup></Form.Label>
									<Form.Control name={"email"} required onChange={onChangeHandler} type="email"
										placeholder="Enter Email Address" />
								</Form.Group>
							</Col>

							<Col md={6}>


							</Col>

							<Col md={12}>

								<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
									<Form.Label>Personal message to {hotel.ownerName}<sup
										className='color_red'>*</sup></Form.Label>
									<Form.Control name={"message"} required onChange={onChangeHandler} as="textarea"
										rows={3} />
								</Form.Group>
							</Col>

						</Row>
					</div>


					<Row className="mt-4">

						<Col md={12}>
							<div className="review_book_container">
								<div className="title_arrow_number mt-1">2</div>
								<h3>Review and book</h3> <br></br>
								<b>{currency}{sumOfCharges()}</b>
								<span className="mx-2">will be charged to your account</span>

								<div className='mt-2 booking_text_container'>
									<input type='checkbox' required />
									<span className="mx-1">This booking is facilitated by Holiday Lettings Ltd (part of the Tripadvisor group) but the booking is solely between you and the owner/manager. By clicking above, you agree to the booking conditions and cancellation policy of the owner/manager, as well as Holiday Lettings’ terms and conditions (which includes chargeback policy) and privacy policy. By clicking above, you will become a Tripadvisor member and agree to Tripadvisor’s privacy policy and terms of use. Although Holiday Lettings facilitates your booking, your payment may be processed by another group company, e.g. FlipKey Inc., on behalf of Holiday Lettings.</span>
								</div>


								{
									!isLoading ?
										<>
											<span><AiFillLock className="booking_lock_icon" /></span>
											<button className="book_now mx-2">Complete booking</button>
										</>
										:
										<div className="text-center">
											<Spinner animation={"border"} />
										</div>


								}


							</div>


						</Col>

					</Row>
				</Form>

			</Col >

			<Col md={4} className="mt-3">
				<Card>
					<Card.Img variant="top" src={image.original} />
					<Card.Body>
						<p>{hotel.name}</p>

						<b className="mt-3">{moment(formInput.startDate).format("LLLL")} -<br />{moment(formInput.endDate).format("LLLL")}
						</b>
						<p className='text-gray'>{daysCount} nights/{formInput.guestCount} guests</p>
						<hr />


						<div className='d-flex justify-content-between mb-2' >
							<div>
								<span>
									Price
								</span>
							</div>

							<div>
								<span>
									{currency}{formInput.price}
								</span>
							</div>
						</div>

						<div className='d-flex justify-content-between mb-2' >
							<div>
								<span>
									Deposit
								</span>
							</div>

							<div>
								<span>
									{currency}{hotel.deposit}
								</span>
							</div>
						</div>

						<div className='d-flex justify-content-between  mb-2' >
							<div>
								<span>
									Cleaning
								</span>
							</div>

							<div>
								<span>
									{currency}{hotel.cleaning}
								</span>
							</div>

						</div>

						<div className='d-flex justify-content-between  mb-2' >
							<div>
								<span>
									Tax
								</span>
							</div>

							<div>
								<span>
									{currency}{hotel.tax}

								</span>
							</div>

						</div>

						<div className='d-flex justify-content-between  mb-2' >
							<div>
								<span>
									Tourist
								</span>
							</div>

							<div>
								<span>
									{currency}{hotel.tourist}
								</span>
							</div>

						</div>

						<hr></hr>

						<div className='total d-flex'>
							<div>
								<b>Total</b>
							</div>
							<div>
								<b>{currency}{sumOfCharges()}</b>
							</div>
						</div>

						<div className='total d-flex mt-1'>
							<div>
								<span>Due now</span>
							</div>
							<div>
								<b>0</b>
							</div>
						</div>

						<div className='values'>

							<p>Why are the values in Euros (EUR)</p>

						</div>

						<div className="max">
							<b className="max-damage">Maximum damage claim:({currency}111){currency}100.00
							</b>

							<p className="max_stored mt-1">Your stored payment details won’t be charged or authorized
								(for a hold on funds) unless the Owner makes a claim for property damage within 10 days
								of your checkout.</p>

						</div>
					</Card.Body>
				</Card>
			</Col>
		</Row >
	)
}

export default SecureBooking
