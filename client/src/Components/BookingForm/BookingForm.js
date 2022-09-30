import React, { useEffect } from 'react'
import { Container, Col, Row, Form } from 'react-bootstrap'
import moment from "moment";
import DatePicker from "react-datepicker";

import '../BookingForm/BookingForm.css'
import { errorNotify } from "../../utils/toast"

const BookingForm = ({ setFormInput, formInput, setStep, daysCount, currency, hotel }) => {


    const onSubmitHandler = () => {
        if (daysCount < 3) {
            errorNotify("Cannot book less then 3 days")
        } else if (daysCount <= 0 || !formInput.guestCount) {
            errorNotify("Please fill in all the details")
        } else {
            setStep(1)
        }
    }

    const onStartDateChangeHandler = (date) => {
        setFormInput({
            ...formInput,
            startDate: date
        })
    }

    const onEndDateChangeHandler = (date) => {
        setFormInput({
            ...formInput,
            endDate: date
        })
    }

    return (
        <>


            <Row>
                <Col md={6}>
                    <DatePicker selected={formInput.startDate} onChange={onStartDateChangeHandler} minDate={moment().toDate()} />

                </Col>

                <Col md={6}>
                    <DatePicker selected={formInput.endDate} onChange={onEndDateChangeHandler} minDate={moment().toDate()} />
                </Col>

                <Col md={12}>
                    <Form.Select onChange={(e) => setFormInput({
                        ...formInput,
                        guestCount: e.target.value
                    })}>
                        <option>Please select</option>
                        <option value="1">1 guest</option>
                        <option value="2">2 guest</option>
                        <option value="3">3 guest</option>
                        <option value="4">4 guest</option>
                        <option value="5">5 guest</option>
                        <option value="6">6 guest</option>
                        <option value="7">7 guest</option>
                        <option value="8">8 guest</option>
                        <option value="9">9 guest</option>
                        <option value="10">10 guest</option>
                        <option value="11">11 guest</option>
                        <option value="12">12 guest</option>
                        <option value="13">13 guest</option>
                        <option value="14">14 guest</option>
                        <option value="15">15 guest</option>
                    </Form.Select>

                </Col>

                <Col md={12}>
                    <div className='dates_section'>
                        <p>Your dates are <b className='color'>Available!</b></p>
                        <hr />
                        <div className='Rate d-flex'>
                            <div>
                                <span className='text'>Rate for {daysCount} nights</span>
                            </div>

                            <div>
                                <span className='text'>
                                    {currency}{formInput.price}
                                </span>

                            </div>
                        </div>

                        <div className='Rate d-flex'>
                            <div>
                                <b className='text'>Subtotal</b>
                            </div>
                            <div>
                                <b className='text'>
                                    {currency}{formInput.price}
                                </b>

                            </div>
                        </div>
                        <hr />

                        <div className='text-center'>

                            <span className='reserved'>Reserved for only</span>
                            <p className='reserved_price'>{currency}{formInput.price}</p>

                            <div className='mt-3'>
                                <button className='booknow_btn' onClick={onSubmitHandler}>Book Now</button>
                            </div>

                            <div className='mt-3'>
                                <p className='minimum_stay'>Minimum stay 3 nights</p>
                            </div>

                            <div className='mt-3 payment_protection'>

                                <p className='payment'>This property has payment protection</p>

                            </div>
                        </div>

                    </div>
                </Col>
            </Row>

        </>
    )
}

export default BookingForm
