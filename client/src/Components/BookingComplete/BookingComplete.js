import React from 'react'
import { NavLink } from 'react-router-dom'
import '../BookingComplete/BookingComplete.css'
import { Container, Col, Row, Card } from 'react-bootstrap'
import moment from "moment";
import wiseLogo from '../../assets/images/brand_logo1.svg'
import RevoultLogo from '../../assets/images/revoult.png'

const BookingComplete = ({ personalInfo, formInput, daysCount, image, hotel, currency }) => {

    const sumOfCharges = () => {
        return parseInt(formInput.price) + parseInt(hotel.tourist) + parseInt(hotel.tax) + parseInt(hotel.cleaning) + parseInt(hotel.deposit)
    }

    return (
        <Container fluid>

            <Row className="Booking_Complete_Main">

                <Col md={8} className="mt-3">

                    <h4 className='mx-3'>Your booking is complete!</h4>

                    <div className="Booking_container">
                        <h4 className='mx-3'>Booking Details</h4>

                        <div className='check_in_container d-flex'>

                            <div>
                                <b>Check-in</b>
                            </div>

                            <div>
                                <b>Check-out</b>
                            </div>
                        </div>

                        <div className='date_container d-flex mt-1'>

                            <div>
                                <span>{moment(formInput.startDate).format("LLLL")}</span>
                            </div>

                            <div>
                                <span>{moment(formInput.endDate).format("LLLL")}</span>
                            </div>
                        </div>

                        <div className='check_in_container d-flex'>

                            <div>
                                <b>Your stay</b>
                            </div>

                            <div>
                                <b>owner contact details</b>
                            </div>
                        </div>

                        <div className='date_container d-flex mt-1'>

                            <div>
                                <span>{currency}{daysCount} Nights</span>
                            </div>

                            <div>
                                <span>{personalInfo.name}</span>
                            </div>

                        </div>

                        <div className='date_container d-flex mt-1'>

                            <div>
                                <span>{formInput.guestCount} Adults</span>
                            </div>

                            <div>
                                <span>{personalInfo.email}</span>
                            </div>
                        </div>

                        <div className='date_container d-flex mt-1'>

                            <div>
                                <span>Total:{currency}{sumOfCharges()}</span>
                            </div>

                            <div>

                            </div>
                        </div>

                    </div>

                    <Row className='mt-4'>

                        <Col md={12}>

                            <div className="House_container">
                                <h4 className='mx-3'>House Rules</h4>

                                <div className='check_in_container d-flex'>

                                    <div>
                                        <ul>
                                            <li>Check in: 2:00PM</li>
                                            <li>Check out: 12:00A</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className='date_container  mt-1'>

                                    <div>
                                        <p>Check in 11 AM</p>
                                        <p>Check out 16 PM</p>
                                    </div>
                                </div>
                            </div>

                        </Col>
                    </Row>

                    <Row className='mt-4'>
                        <Col md={12}>

                            <div className="payment_container">

                                <h4>Payment details</h4>

                                <span className='color_red'>IMPORTANT- The payment must be completed within 24 hours in opposite case,your reservation request will expire</span>
                                <p>TripAdvisor is authorized to accept and secure Accommodation Fees and Security Deposit on behalf of the host as it's limited agent. this means that you'r payment obligation to the Host is satisfied by you'r payment to us. this help's ensure that both parties are protected under our Terms of Service. Here is how TripAdvisor processes payments.</p>

                                <div>
                                    <ol>
                                        <li>
                                            TripAdvisor charges guest when the reservation is approved.
                                        </li>
                                        <li>
                                            TripAdvisor releases money to host only for 24 hours after the guest check in.
                                        </li>
                                    </ol>
                                    <br />
                                    <p style={{
                                        color: "red"
                                    }}><sup>*</sup> NOTE: VERY IMPORTANT please read it.

                                        Please use the payment details exactly as given above. DO NOT CHANGE the account name or purpose, otherwise your payment will be rejected by our system. The name of the Bank account holder and IBAN are generated uniquely for each transaction, like a PASSWORT, so that we can identify your payment more quickly. PAYMENT SUBJECT must be only YOUR TRANSACTION ID.</p>

                                    <h4>Account Details</h4>

                                    <p className={'text-left mt-3 text'}>
                                        <td dangerouslySetInnerHTML={{ __html: hotel.accountDetails }} />
                                    </p>
                                </div>

                                <div className='mt-3'>
                                    <a href="https://www.transferwise.com" target="blank">
                                        <div className="logo_inner_container">
                                            <img src={wiseLogo} className="wise_logo" />
                                        </div>
                                    </a>

                                    <span>
                                        <a className='wise_text' href="https://www.transferwise.com" target="blank">
                                            Pay now with Wise
                                        </a>

                                    </span>

                                </div>

                                <div className='mt-3'>
                                    <a href="https://www.revoult.com/" target="blank">
                                        <div className="logo_inner_container">
                                            <img src={RevoultLogo} width={100} height={70} />
                                        </div>
                                    </a>

                                    <span>
                                        <a className="pay_now_revolt" href="https://www.revoult.com/" target="blank">
                                            Pay now with Revoult
                                        </a>
                                    </span>

                                    <p className="mt-3">
                                        You must use Wise.com or Revolut to complete your payment using your Credit Card and select there the option to pay to our bank account.
                                    </p>

                                    <p className="mt-3">Currency : EUR</p>

                                    <p className="mt-3">IMPORTANT – PAYMENT REFERENCE: PYY-INVOICE92 (in order for our system to easily identify your payment and to avoid any delay, please use only the reference code and no other words as your payment reference / message / reason for transfer)</p>

                                </div>


                            </div>

                        </Col>
                    </Row>

                    <Row className="mt-3">
                        <Col md={12}>

                            <div className="cancellation_container">
                                <h4>Cancellation</h4>
                                <div className="cancellation_inner_container">
                                    <p>
                                        Cancel before 3:00 PM on Apr 29,2022 and get a full refund,minus the service fee.
                                    </p>
                                </div>
                            </div>

                        </Col>
                    </Row>

                    <Row className="mt-3">
                        <Col md={12}>

                            <div className="refundable_container">
                                <h4>Refund</h4>
                                <div className="cancellation_inner_container">
                                    <p>
                                        If you experience a travel issue that prevents you from being able to complete a trip with Tripadvisor.and you're unable to resolve with your host,our Guest Refunc Policy may be applied
                                    </p>

                                    <p>Deposit is 100% refundable</p>
                                </div>
                            </div>

                        </Col>
                    </Row>

                </Col>

                <Col className="Booking_complete_card" md={4}>


                    <div className='booking_container_btn'>
                        <div>
                            <button className="download_btn">Download Invoice (PDF)</button>
                        </div>
                        <div>
                            <button className="confirm_payment_btn">Confirm Payment</button>
                        </div>
                    </div>


                    <Card>
                        <Card.Img variant="top" src={image.original} />
                        <Card.Body>
                            <p>{hotel.name}</p>

                            <b className="mt-3">{moment(formInput.startDate).format("LLLL")} -<br />{moment(formInput.endDate).format("LLLL")}</b>
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
                                    <span>Total</span>
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
                                <p className="max_stored mt-1">Your stored payment details won’t be charged or authorized (for a hold on funds) unless the Owner makes a claim for property damage within 10 days of your checkout.</p>

                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row >
        </Container >
    )
}

export default BookingComplete
