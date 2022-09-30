import React from 'react';
import {Container, Form, Row, Col, Spinner} from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {errorNotify} from "../../utils/toast";

const Auth = () => {
	const navigation = useNavigate();
	const [formInput, setFormInput] = React.useState({
		email: '',
		password: ''
	})

	const [isLoading, setIsLoading] = React.useState(false);

	const onChangeHandler = (e) => {
		const { name, value } = e.target
		setFormInput({
			...formInput,
			[name]: value
		})
	}

	const onSubmitHandler = (e) => {
		setIsLoading(true)
		e.preventDefault();
		axios.post("/login", formInput)
			.then((res) => {
				setIsLoading(false)
				localStorage.setItem("token", res.data.token)
				navigation("/admin/hotel")
			})
			.catch(() => {
				setIsLoading(false)
				errorNotify("Email or password is incorrect")
			})
	}

	return (
		<Container style={{
			height: "100vh"
		}}>
			<Row className={"justify-content-center align-items-center h-100"}>
				<Col md={6}>
					<h4>Login</h4>
					<Form onSubmit={onSubmitHandler}>
						<Form.Group className={"mt-3"}>
							<Form.Label>Email</Form.Label>
							<Form.Control name={"email"} type="email" required onChange={onChangeHandler} />
						</Form.Group>
						<Form.Group className={"mt-3"}>
							<Form.Label>Password</Form.Label>
							<Form.Control name={"password"} type="password" required onChange={onChangeHandler} />
						</Form.Group>
						<div className="text-center">
							{
								!isLoading ?
									(
										<div>
											<button type={"submit"} className={"px-3 mt-3"}>
												Login
											</button>
										</div>
									) : (
										<div className={"text-center mt-3"}>
											<Spinner animation={"border"}/>
										</div>
									)
							}
						</div>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default Auth;
