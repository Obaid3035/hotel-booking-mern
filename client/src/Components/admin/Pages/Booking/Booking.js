import React, {useEffect, useState} from 'react';
import {Spinner, Table} from "react-bootstrap";
import axios from "axios";
import moment from "moment";

const Booking = () => {
	const columns = ["Name", "Phone Number", "Check In", "Check Out", "email", "message"]

	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		setIsLoading(true)
		axios.get("/admin/booking")
			.then((res) => {
				setIsLoading(false)
				setData(res.data)
			})
	}, [])

	return (
		<div className={"page_responsive"}>
			<h3>Bookings</h3>
			<Table striped bordered hover>
				{
					!isLoading ?
						(
							<React.Fragment>
								<thead>
								<tr>
									{
										columns.map((name) => (
											<th>{name}</th>
										))
									}
								</tr>
								</thead>
								<tbody>
								{
									data.map((data) => (
										<tr>
											<td>{data.name}</td>
											<td>{data.phoneNumber}</td>
											<td>{moment(data.startDate).format("LLLL")}</td>
											<td>{moment(data.endDate).format("LLLL")}</td>
											<td>{data.email}</td>
											<td>{data.message}</td>
										</tr>
									))
								}
								</tbody>
							</React.Fragment>
						) : (
							<div className="text-center">
								<Spinner animation={"border"}/>
							</div>
						)
				}
			</Table>
		</div>
	);
};

export default Booking;
