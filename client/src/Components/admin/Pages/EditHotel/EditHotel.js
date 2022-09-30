import React, {useEffect} from 'react';
import {Form} from "react-bootstrap";
import '../CreateHotel/CreateHotel.css'
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import ReactQuill from "react-quill";
import {errorNotify, successNotify} from "../../../../utils/toast";
import './EditHotel.css';

const EditHotel = () => {

	const modules = {
		toolbar: [
			[{ header: [1, 2, false] }],
			["bold", "italic", "underline", "strike", "blockquote"],
			[{ list: "ordered" }, { list: "bullet" }],
		]
	};

	const formats = [
		"header",
		"bold",
		"italic",
		"underline",
		"strike",
		"blockquote",
		"list",
		"bullet",
		"indent",
		"link",
		"image"
	];

	const navigation = useNavigate();
	const { id } = useParams();

	const [isLoading, setIsLoading] = React.useState(false);
	const [isFetching, setIsFetching] = React.useState(false);
	const [images, setImages] = React.useState([]);
	const [editorText, setEditorText] = React.useState({
		description: null,
		ownerDescription: null,
		amenities: null
	});

	const [fileInput, setFileInput] = React.useState([])

	useEffect(() => {
		setIsFetching(true)
		axios.get(`/admin/hotel/${id}`)
			.then((res) => {
				setEditorText({
					ownerDescription: res.data.ownerDescription,
					description: res.data.description,
				})
				setFormInput({
					name: res.data.name,
					price: res.data.price,
					bookingReference: res.data.bookingReference,
					deposit: res.data.deposit,
					tax: res.data.tax,
					cleaning: res.data.cleaning,
					tourist: res.data.tourist,
					ownerName: res.data.ownerName,
					currency: res.data.currency,
				})
				setImages(res.data.images)
				setIsFetching(false)
				console.log(res.data)
			})
	}, [])

	const [formInput, setFormInput] = React.useState({
		name: '',
		price: '',
		deposit: '',
		tax: '',
		cleaning: '',
		tourist: '',
		ownerName: '',
		currency: '$',
		bookingReference: ''
	})
	const onSubmitHandler = async (e) => {
		e.preventDefault()
		setIsLoading(true)
		try {
			const formData = {
				name: formInput.name,
				price: formInput.price,
				ownerName: formInput.ownerName,
				tourist: formInput.tourist,
				deposit: formInput.deposit,
				tax: formInput.tax,
				bookingReference: formInput.bookingReference,
				currency: formInput.currency,
				cleaning: formInput.cleaning,
				description: editorText.description,
				ownerDescription: editorText.ownerDescription,

			}
			await axios.put(`/admin/hotel/${id}`, formData)
			navigation("/admin/hotel");
			successNotify("Hotel successNotify updated!")
			setIsLoading(false)
		} catch (e) {
			console.log(e);
		}
	}


	const handleChange = (e) => {
		const { name, value} = e.target;
		setFormInput({
			...formInput,
			[name]: value
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

	const amenitiesChangeHandler = (text) => {
		setEditorText({
			...editorText,
			amenities: text
		})
	}

	const deleteImageHandler = (img) => {
		setIsFetching(true)
		axios.post(`/images/${id}`, {
			cloudinary_id: img.cloudinary_id,
			image_id: img._id
		})
			.then((res) => {
				setIsFetching(true)
				successNotify("Images deleted successfully")
				navigation("/admin/hotel");
			})
			.catch((err) => {
				errorNotify(err?.response.data.message)
				setIsFetching(false)
			})
	}

	const onFileUpload = (e) => {
		e.preventDefault();
		setIsFetching(true)
		const formData = new FormData();
		fileInput.forEach((i) => {
			formData.append('images', i);
		});

		axios.put(`/upload-images/${id}`, formData)
			.then((res) => {
				setIsFetching(false)
				successNotify("Images uploaded successfully")
				navigation("/admin/hotel");
			})

	}


	return (
		<div className={'page_responsive'}>
			<h5>Create Customer</h5>
			{
				!isFetching ?
					(
						<div>
							<Form onSubmit={onSubmitHandler}>
								<div className="form-row create_form">
									<Form.Group className={'col-md-6'}>
										<Form.Label>
											Booking Reference
										</Form.Label>
										<Form.Control name="bookingReference" required  className={'text_input'} type={'text'} value={formInput.bookingReference} onChange={handleChange}/>
									</Form.Group>
									<Form.Group className={'col-md-6'}>
										<Form.Label>
											Hotel Name
										</Form.Label>
										<Form.Control name="name" required  className={'text_input'} type={'text'} value={formInput.name}  onChange={handleChange}/>
									</Form.Group>

									<Form.Group className={'col-md-6'}>
										<Form.Label>
											Owner Name
										</Form.Label>
										<Form.Control name="ownerName" required  className={'text_input'} type={'text'} value={formInput.ownerName}  onChange={handleChange}/>
									</Form.Group>

									<Form.Group className={'col-md-6'}>
										<Form.Label>
											Hotel Price
										</Form.Label>
										<Form.Control name='price' required className={'text_input'} type={'number'} value={formInput.price}  onChange={handleChange}/>
									</Form.Group>

									<Form.Group className={'col-md-6'}>
										<Form.Label>
											Deposit
										</Form.Label>
										<Form.Control name='deposit' value={formInput.deposit} required className={'text_input'} type={'number'} onChange={handleChange}/>
									</Form.Group>

									<Form.Group className={'col-md-6'}>
										<Form.Label>
											Cleaning
										</Form.Label>
										<Form.Control name='cleaning' value={formInput.cleaning} required className={'text_input'} type={'number'} onChange={handleChange}/>
									</Form.Group>

									<Form.Group className={'col-md-6'}>
										<Form.Label>
											Tax
										</Form.Label>
										<Form.Control name='tax' required value={formInput.tax} className={'text_input'} type={'number'} onChange={handleChange}/>
									</Form.Group>

									<Form.Group className={'col-md-6'}>
										<Form.Label>
											Tourist
										</Form.Label>
										<Form.Control name='tourist' value={formInput.tourist} required className={'text_input'} type={'number'} onChange={handleChange}/>
									</Form.Group>


									<Form.Group className={'col-md-6'}>
										<Form.Label>
											Overview Description
										</Form.Label>
										<ReactQuill
											theme="snow"
											modules={modules}
											formats={formats}
											value={editorText.description}
											onChange={descriptionChangeHandler}
										/>
									</Form.Group>

									<Form.Group className={'col-md-6'}>
										<Form.Label>
											About the owner Description
										</Form.Label>
										<ReactQuill
											theme="snow"
											modules={modules}
											formats={formats}
											value={editorText.ownerDescription}
											onChange={ownerDescriptionChangeHandler}
										/>
									</Form.Group>

									<Form.Group className={'col-md-2'}>
										<Form.Label>
											Currency:
										</Form.Label>
										<select name="currency" className={"mx-3"}  onChange={(e) => {
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
								</div>
								{
									!isLoading ?
										(
											<div className={'text-right mt-3'}>
												<button type={'submit'} className={'px-4 py-2 '}>Save</button>
											</div>
										) : (
											<div className={"text-center"}>
												<Spinner animation={"border"}/>
											</div>
										)
								}
							</Form>
							<Form onSubmit={onFileUpload} className={"my-3"}>
								<Form.Group>
									<Form.Label>Upload Images</Form.Label>
									<Form.Control type={"file"} required multiple={true} onChange={(e) => setFileInput(Object.values(e.target.files))}/>
								</Form.Group>
								<div className={"text-center"}>
									<button className={"my-3"}>Upload</button>
								</div>
							</Form>
							<div className={"d-flex align-content-center"}>
								{
									images.map((img) => {
										return  (
											<div className={"img_container"}>
												<img alt={img._id} src={img.avatar}/>
												<button className={"px-4 py-2"} onClick={() => deleteImageHandler(img)}>Delete</button>
											</div>
										)
									})
								}
							</div>
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

export default EditHotel;
