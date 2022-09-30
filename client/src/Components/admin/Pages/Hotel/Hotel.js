import React, {useEffect, useState} from 'react';
import {Spinner, Table} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import axios from "axios";
import {successNotify} from "../../../../utils/toast";

const Hotel = () => {

	const navigation = useNavigate();
	const columns = ["ID", "Hotel Name", "Description", "Owner Description", "Price", "Edit", "Copy Link"]

	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		setIsLoading(true)
		axios.get("/admin/hotel")
			.then((res) => {
				setIsLoading(false)
				setData(res.data)
			})
	}, [])

	return (
		<div className={"page_responsive"}>
			<h3>Hotels</h3>
			<div className={'d-flex justify-content-end'}>
				<button className={'btn-send mb-4'} onClick={() => navigation("/admin/create/hotel")}>
					Add Hotel
				</button>
			</div>
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
											<td>{data._id}</td>
											<td>{data.name}</td>
											<td>{data.description}</td>
											<td>{data.ownerDescription}</td>
											<td>{data.price}</td>
											<td>
												<button onClick={() => navigation(`/admin/edit/hotel/${data._id}`)}>Edit</button>

											</td>
											<td><CopyToClipboard
												text={`https://trip-dev-client.herokuapp.com/${data._id}`}
												onCopy={() => successNotify("Link successNotify copied")}
											>
												<button>Link</button>
											</CopyToClipboard></td>
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

export default Hotel;
