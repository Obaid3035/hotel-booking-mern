import React, {useState} from 'react';
import {Form} from "react-bootstrap";
import './CreateHotel.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlusCircle } from "react-icons/ai"
import { Spinner } from "react-bootstrap";
import Editor from "../../../Editor/Editor";
import {errorNotify, successNotify} from "../../../../utils/toast";

const CreateHotel = () => {

	const navigation = useNavigate();
	const [isLoading, setIsLoading] = React.useState(false);
	const [editorText, setEditorText] = React.useState({
		description: "",
		ownerDescription: "",
		amenities: "",
		accountDetails: ""
	});
	const [formInput, setFormInput] = React.useState({
		name: '',
		price: '',
		deposit: '',
		tax: '',
		cleaning: '',
		tourist: '',
		ownerName: '',
		currency: '$',
		images: [],
		avatar: '',
		bookingReference: ''
	})
	const onSubmitHandler = async (e) => {
		e.preventDefault()
		if (amenities.length <= 0) {
			errorNotify("Please enter atleast one amenities")
		} else {
			setIsLoading(true)
			try {
				const formData = new FormData()
				formInput.images.forEach((i) => {
					formData.append('images', i);
				});
				formData.append("name", formInput.name)
				formData.append("price", formInput.price)
				formData.append("tax", formInput.tax)
				formData.append("deposit", formInput.deposit)
				formData.append("cleaning", formInput.cleaning)
				formData.append("tourist", formInput.tourist)
				formData.append("ownerName", formInput.ownerName)
				formData.append("currency", formInput.currency)
				formData.append("avatar", formInput.avatar)
				formData.append("description", editorText.description)
				formData.append("bookingReference", formInput.bookingReference)
				formData.append("accountDetails", editorText.accountDetails)
				formData.append("amenities", JSON.stringify(amenities))
				formData.append("ownerDescription", editorText.ownerDescription)
				await axios.post("/admin/hotel", formData)
				navigation("/admin/hotel");
				successNotify("Hotel successNotify created!")
				setIsLoading(false)
			} catch (e) {
				console.log(e);
			}
		}

	}



	const handleChange = (e) => {
		const { name, value} = e.target;
		setFormInput({
			...formInput,
			[name]: value
		})
	}

	const avatarUploadHandler = (e) => {
		setFormInput({
			...formInput,
			avatar: e.target.files[0]
		})
	}


	const fileChangeHandler = (e) => {
		setFormInput({
			...formInput,
			images: Object.values(e.target.files)
		})
	}

	const ownerDescriptionChangeHandler = (text) => {
		setEditorText({
			...editorText,
			ownerDescription: text
		})
	}

	const descriptionChangeHandler = (text) => {
		setEditorText({
			...editorText,
			description: text
		})
	}

	const accountDetailsChangeHandler = (text) => {
		setEditorText({
			...editorText,
			accountDetails: text
		})
	}

	const [amenities, setAmenities] = useState([]);

	const onAddAmenitiesHandler = () => {
		if (editorText.amenities) {
			const amenitiesClone  = amenities.concat();

			amenitiesClone.push(editorText.amenities)
			setAmenities(amenitiesClone)
			setEditorText({
				...editorText,
				amenities: ""
			})
		} else {
			errorNotify("Input field cannot be empty")
		}
	}


	return (
		<div className={'page_responsive'}>
			<h5>Create Customer</h5>
			{
				!isLoading ?
					(
						<div>
							<Form onSubmit={onSubmitHandler}>
								<div className="form-row create_form">
									<Form.Group className={'col-md-6'}>
										<Form.Label>
											Booking Reference
										</Form.Label>
										<Form.Control name="bookingReference" required  className={'text_input'} type={'text'}  onChange={handleChange}/>
									</Form.Group>
									<Form.Group className={'col-md-6'}>
										<Form.Label>
											Hotel Name
										</Form.Label>
										<Form.Control name="name" required  className={'text_input'} type={'text'}  onChange={handleChange}/>
									</Form.Group>

									<Form.Group className={'col-md-6'}>
										<Form.Label>
											Owner Name
										</Form.Label>
										<Form.Control name="ownerName" required  className={'text_input'} type={'text'}  onChange={handleChange}/>
									</Form.Group>

									<Form.Group className={'col-md-6'}>
										<Form.Label>
											Hotel Price
										</Form.Label>
										<Form.Control name='price' required className={'text_input'} type={'number'} onChange={handleChange}/>
									</Form.Group>

									<Form.Group className={'col-md-6'}>
										<Form.Label>
											Deposit
										</Form.Label>
										<Form.Control name='deposit' required className={'text_input'} type={'number'} onChange={handleChange}/>
									</Form.Group>

									<Form.Group className={'col-md-6'}>
										<Form.Label>
											Cleaning
										</Form.Label>
										<Form.Control name='cleaning' required className={'text_input'} type={'number'} onChange={handleChange}/>
									</Form.Group>

									<Form.Group className={'col-md-6'}>
										<Form.Label>
											Tax
										</Form.Label>
										<Form.Control name='tax' required className={'text_input'} type={'number'} onChange={handleChange}/>
									</Form.Group>

									<Form.Group className={'col-md-6'}>
										<Form.Label>
											Tourist
										</Form.Label>
										<Form.Control name='tourist' required className={'text_input'} type={'number'} onChange={handleChange}/>
									</Form.Group>


									<Form.Group className={'col-md-6'}>
										<Form.Label>
											Overview Description
										</Form.Label>
										<Editor onChange={descriptionChangeHandler} value={editorText.description} />
									</Form.Group>

									<Form.Group className={'col-md-6'}>
										<Form.Label>
											Account Details
										</Form.Label>
										<Editor onChange={accountDetailsChangeHandler} value={editorText.accountDetails} />
									</Form.Group>

									<Form.Group className={'col-md-6'}>
										<Form.Label>
											About the owner Description
										</Form.Label>
										<Editor onChange={ownerDescriptionChangeHandler} value={editorText.ownerDescription} />
									</Form.Group>
									<Form.Group className={'col-md-2'}>
										<Form.Label>
											Currency:
										</Form.Label>
										<select name="currency" className={"mx-3"} onChange={(e) => {
											setFormInput({
												...formInput,
												currency: e.target.value
											})
										}} >
											<option value="$">$</option>
											<option value="€">€</option>
											<option value="£">£</option>
										</select>
									</Form.Group>
									<Form.Group className={'col-md-2'}>
										<Form.Label>
											Amenities
										</Form.Label>
										<Form.Control type={"text"} value={editorText.amenities} onChange={(e) => {
											setEditorText({
												...editorText,
												amenities: e.target.value
											})
										}} />
									</Form.Group>

									<Form.Group className={'col-md-2'} style={{
										fontSize: "32px",
										cursor: "pointer"
									}}
									 onClick={onAddAmenitiesHandler}
									>
										<AiOutlinePlusCircle />
									</Form.Group>

									<Form.Group className={'col-md-6'}>
										<Form.Label>
											Images
										</Form.Label>
										<Form.Control name='images' required type={'file'} multiple={true} onChange={fileChangeHandler}/>
									</Form.Group>

									<Form.Group className={'col-md-6'}>
										<Form.Label>
											Avatar
										</Form.Label>
										<Form.Control name='images' required type={'file'} onChange={avatarUploadHandler}/>
									</Form.Group>
								</div>
								<h4>Amenities</h4>
								{
									amenities.map((amenities) => (
										<p className={"mt-3 ml-2"}>{ amenities },</p>
									))
								}
								{
									amenities.length <= 0 ?
										<p>Please fill in amenities</p>
										: null
								}


								<div className={'text-right mt-3'}>
									<button type={'submit'} className={'px-4 py-2 '}>Save</button>
								</div>
							</Form>
						</div>
					) : (
						<div className={"text-center"}>
							<Spinner animation={"border"}/>
						</div>
					)
			}
		</div>
	);
};

export default CreateHotel;
