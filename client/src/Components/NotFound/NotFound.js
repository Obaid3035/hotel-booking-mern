import React from 'react';
import {Col, Row} from "react-bootstrap";

const NotFound = () => {
	return (
		<section className="container" style={{
			height: "100vh"
		}}>
			<Row className={"justify-content-center align-items-center"}>
				<Col md={8}>
					<h3>Page Not Found</h3>
				</Col>
			</Row>
		</section>
	);
};

export default NotFound;
