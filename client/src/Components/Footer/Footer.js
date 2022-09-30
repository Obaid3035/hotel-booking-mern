import React from 'react'
import { Container, Col, Row, Form } from 'react-bootstrap'
import FooterImg from "../../assets/images/footer_logo.png";
import '../Footer/Footer.css'

const Footer = () => {
    return (
        <>

            <Container fluid>

                <Row className="Footer_background">
                    <Col md={3} className={"d-flex justify-content-end"}>
                        <img alt={"footer"} src={FooterImg} width={50} height={50} className={"footer_img"} />
                    </Col>
                    <Col md={9}>

                        <div className="main_links">
                            <small>Copywright 2022 Tripadvisor LLC All rights reserved.</small>
                            <div className="d-flex Links_Container">

                                <div>
                                    <b className='border_bottom'>Terms of Use</b>
                                </div>
                                <div>
                                    <b className='border_bottom'>Privacy and Cookies Statement</b>
                                </div>
                                <div>
                                    <b className='border_bottom'>Cookie concent</b>
                                </div>
                                <div>
                                    <b className='border_bottom'>Site Map</b>
                                </div>
                                <div>
                                    <b className='border_bottom'>How the site works</b>
                                </div>

                            </div>
                            <div className='mt-2'>
                                <p>This is the version of our website addressed to speakers of English in the United States. If you are a resident of another country or region, please select the appropriate version of Tripadvisor for your country or region in the drop-down men</p>
                            </div>
                        </div>

                    </Col>
                </Row>

            </Container>


        </>
    )
}

export default Footer
