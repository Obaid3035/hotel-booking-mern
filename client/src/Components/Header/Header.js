import React from 'react'
import { Navbar, Container, Nav, Form, FormControl, Button, NavDropdown, Col, Row } from 'react-bootstrap'
import '../Header/Header.css'
import { FaPhoneAlt } from 'react-icons/fa';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs'
import TripAdvisorLogo from '../../assets/images/tripadvisor_logo.svg'




const Header = () => {
    return (
        <>

            <Navbar bg="light" expand="lg">
                <Container className="Nav_Container" fluid>
                        <Navbar.Brand href="#" className='brand_name mx-2'>
                        
                         <img src ={TripAdvisorLogo} alt="logo" width={200}/>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                            <Nav
                                className="me-auto"
                                style={{ maxHeight: '100px' }}
                                navbarScroll
                            >
                            </Nav>

                            <Form className="d-flex mr-0 w-50">
                                <span className='search_icon'><BsSearch /></span>
                                <FormControl
                                    type="search"
                                    className="me-2 w-100"
                                    aria-label="Search"
                                />
                            </Form>

                            <Nav className='d-flex w-100' style={{ justifyContent: "flex-end" }}>
                                <Nav.Link href="#deets" className='phone_link'>

                                    <span className='phone_icon'><FaPhoneAlt /></span>
                                    <b>(908)391-3891</b>

                                </Nav.Link>
                                <Nav.Link eventKey={2} href="#memes">
                                    <span className='heart_icon'><AiOutlineHeart /></span>
                                    <b>Saved</b>
                                </Nav.Link>
                                <Button className='mr-0 header_sign_in'>Sign in</Button>
                            </Nav>

                        </Navbar.Collapse>
                 


                </Container>
            </Navbar>

            <Navbar bg="light" variant="light">
                <Container className="second_nav_container" fluid >
                    <Row className='second_nav_row'>
                        <Col md={12}>
                            <Nav className="me-auto"  style={{ padding: "5px" }}>
                                <Nav.Link className="menu-active">Hotel</Nav.Link>
                                <Nav.Link className="menu-active">Things to do</Nav.Link>
                                <Nav.Link className="menu-active">Restraunts</Nav.Link>
                                <Nav.Link className="menu-active">Flights</Nav.Link>
                                <Nav.Link className="menu-active">Vacation Rentals</Nav.Link>
                                <Nav.Link className="menu-active">Shipping</Nav.Link>
                                <Nav.Link className="menu-active">Vacation Packages</Nav.Link>
                                <Nav.Link className="menu-active">Cruises</Nav.Link>
                                <Nav.Link className="menu-active">Rental Cars</Nav.Link>
                            </Nav>
                        </Col>
                    </Row>
                </Container>
            </Navbar>


           





        </>
    )
}

export default Header