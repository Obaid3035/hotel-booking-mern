import React, { useEffect, useState, useRef } from 'react'
import { Container, Col, Row, Spinner } from 'react-bootstrap'
import '../Home/Home.css'
import ImageGallery from '../ImageGallery/ImageGallery'
import BookingForm from '../BookingForm/BookingForm.js'
import { Steps } from "rsuite";
import SecureBooking from "../SecureBooking/SecureBooking";
import BookingComplete from "../BookingComplete/BookingComplete";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import Header from '../Header/Header'
import { ScrollingProvider, useScrollSection, Section, } from 'react-scroll-section';
import Review1 from '../../assets/images/review1.jpeg'
import Review2 from '../../assets/images/review2.jpeg'
import Review3 from '../../assets/images/review3.jpeg'
import Review4 from '../../assets/images/review4.jpeg'
import Review5 from '../../assets/images/review5.jpeg'
import Review6 from '../../assets/images/review6.jpeg'
import Review7 from '../../assets/images/review7.jpeg'

const Home = () => {
    const navigation = useNavigate()
    const { id } = useParams();
    const [hotel, setHotel] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [images, setImages] = useState([])
    const OverviewContainer = useRef(null)
    const ReviewContainer = useRef(null)
    const AminitiesContainer = useRef(null)
    const [currency, setCurrency] = useState('$')

    const goToOverviewSection = () => {
        window.scrollTo({
            top: OverviewContainer.current.offsetTop,
            behavior: 'smooth'
        })
    }

    const goToReviewSection = () => {
        window.scrollTo({
            top: ReviewContainer.current.offsetTop,
            behavior: 'smooth'
        })
    }

    const goToAminitiesSection = () => {
        window.scrollTo({
            top: AminitiesContainer.current.offsetTop,
            behavior: 'smooth'
        })
    }

    const OverViewSection = useScrollSection('overview');
    const reviewSection = useScrollSection('review');


    const reviewDummyData = [
        {
            id: 1,
            client_name: "J_George",
            img: Review1,
            head: "Excellent place",
            text: "She was very available and always willing to help with anything from planning things to do to arranging transportation. Also, one night I wasn't feeling well and the staff drove me to a nearby pharmacy and made me tea when we got back. The villa was absolutely beautiful, especially the view. It comfortably fit a large group and could have easily housed a few more as well. The location is very convenient, as it is near town and also right next to an ATV/car rental. I would gladly stay here again."

        },
        {
            id: 2,
            client_name: "D_Micheal",
            img: Review2,
            head: "couldn't have asked for more",
            text: "This villa is amazing. It is spacious and has expansive views. We had a fabulous time."
        },
        {
            id: 3,
            client_name: "Harry.GH",
            img: Review3,
            head: 'Lovely place!',
            text: "My friends and I stayed at this Villa for fall break and LOVED our stay! The villa was beautiful, came with so many amenities, and made our experience in this place even more enjoyable! The staff was a delight and was so incredibly generous - she made all the difference in our stay."
        },
        {
            id: 4,
            client_name: "Jackson.HR",
            img: Review4,
            head: "Wonderful",
            text: " Our stay at the Villa was the best, The comfort and beauty of the villa made everyone in our group to celebrate a birthday, happy and very pleased that this lovely home was our base. If the staff, recommends anything I would suggest that you take their advice and do it. They has great connections with those who can offer you adventures to enhance your trip."
        },
        {
            id: 5,
            client_name: "Emmie Wallei",
            img: Review5,
            head: "Love this Place!",
            text: "The host was friendly, communicated well throughout the process and responded quickly to inquires. The home is exactly as pictured. Highly recommend."
        },
        {
            id: 6,
            client_name: "John Doe",
            img: Review6,
            head: "Great Location, Well equipped, Thoughtful Owner",
            text: "The staff were extremely helpful and responded to all of our questions/requests very quickly. The villa was cleaned daily and had beautiful views with lots of facilities such as a gas bbq, pool and sound system."
        },
        {
            id: 7,
            client_name: "Ricky Johnson",
            img: Review7,
            head: "Best Place to Live",
            text: " Amazing villa with amazing service we really loved it!"
        },
       
    ]





    useEffect(() => {
        setIsLoading(true)
        axios.get(`/admin/hotel/${id}`)
            .then((res) => {
                setIsLoading(false)
                let arr = []
                res.data.images.forEach((img) => {
                    arr.push({
                        original: img.avatar
                    })
                })
                setImages(arr)
                setCurrency(res.data.currency)
                setHotel(res.data)
            })
            .catch(() => {
                navigation("/error/123")
            })
    }, [])

    const [formInput, setFormInput] = useState({
        startDate: moment().toDate(),
        endDate: moment().toDate(),
        price: 0,
        guestCount: null,

    })

    const [daysCount, setDaysCount] = React.useState(0)

    useEffect(() => {
        if (hotel) {
            const startD = moment(formInput.startDate);
            const endD = moment(formInput.endDate)
            let diff = endD.diff(startD, "days")
            setDaysCount((diff + 2))
            setFormInput({
                ...formInput,
                price: (diff + 2) * hotel.price
            })
        }
    }, [formInput.startDate, formInput.endDate])

    const [step, setStep] = useState(0)

    const [personalInfo, setPersonalInfo] = useState({
        name: "",
        phoneNumber: "",
        address: "",
        email: "",
        message: ""
    })

    let data;
    if (step === 0 && hotel) {
        data = (
            <React.Fragment>
                <div className='mt-3'>
                    <h4 className="image_title">{hotel.name}</h4>
                    <div className='Round_green_container d-flex m-1'>
                        <div className='rounded_green text-center'>.</div>
                        <div className='rounded_green text-center'>.</div>
                        <div className='rounded_green text-center'>.</div>
                        <div className='rounded_green text-center'>.</div>
                        <div className='rounded_green text-center'>.</div>
                        <span className='mx-1 review text-center'>85 reviews</span>
                    </div>
                </div>


                <Row className='gallery_background_image'>

                    <Col md={8}>
                        <div className='mt-4'>
                            <ImageGallery images={images} />
                        </div>

                        <Row className='mt-3'>
                            <Col md={12}>

                                <div className='d-flex Tabs_container'>
                                    <div className='tab_owner' onClick={(e) => {
                                        e.preventDefault();
                                        window.location.replace("#overview")
                                    }}>
                                        Overview
                                    </div>

                                    <div className='tab_reviews' onClick={(e) => {
                                        e.preventDefault();
                                        window.location.replace("#reviews")
                                    }}>
                                        Reviews

                                    </div>

                                    <div className='tab_aminities' onClick={(e) => {
                                        e.preventDefault();
                                        window.location.replace("#amenities")
                                    }} >
                                        Amenities
                                    </div>

                                    <div className='tab_availability' onClick={(e) => {
                                        e.preventDefault();
                                        window.location.replace("#availability")
                                    }}>
                                        Availability

                                    </div>



                                </div>


                            </Col>



                        </Row>

                        <Row className='mt-4'>
                            <Col md={12}>
                                <ScrollingProvider>
                                    <Section id="overview">
                                        <div className="House_Rules_Container">

                                            <h4 id={"overview"} className="overview">Overview</h4>
                                            <hr />
                                            <p className={'text-left mt-3 text'}>
                                                <td dangerouslySetInnerHTML={{ __html: hotel.description }} />
                                            </p>


                                        </div>
                                    </Section>
                                </ScrollingProvider>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={12}>

                                <div className="House_Rules_Container mt-4" >

                                    <h4 className="overview">About The Owner</h4>
                                    <hr />
                                    <Row>
                                        <Col md={3}>
                                            <div className="owner_image_container">

                                                <img className='owner_image' src={hotel.avatar.avatar} />

                                            </div>
                                        </Col>
                                        <Col md={9}>

                                            <p className={'text'}>
                                                <td dangerouslySetInnerHTML={{ __html: hotel.ownerDescription }} />
                                            </p>
                                        </Col>
                                    </Row>
                                </div>

                            </Col>
                        </Row>

                        <Row>
                            <Col md={12} className="mt-3 mb-3">

                                <div className="House_Rules_Container mt-4" ref={AminitiesContainer}>

                                    <h4 id={"amenities"} className="overview">Amenities</h4>
                                    <hr />
                                    <div className={'mt-3 text'} >
                                        <ul>
                                            {
                                                hotel.amenities.map((text) => {
                                                    return (
                                                        <li style={{
                                                            listStyle: "none",
                                                            float: "left",
                                                            width: "33.333%"
                                                        }}>✅ {text}</li>
                                                    )
                                                })
                                            }


                                        </ul>
                                    </div>

                                </div>


                            </Col>
                        </Row>

                        <Row>
                            <Col md={12}>

                                <ScrollingProvider>
                                    <Section id='review'>
                                        <div className="House_Rules_Container mt-4">

                                            <h4 id={"reviews"} className="overview">Reviews (8)</h4>
                                            <hr />
                                            {reviewDummyData.map((data) => {
                                                const { client_name, img, id, head, text } = data;
                                                return (
                                                    <Row className="mt-4" key={id}>
                                                        <Col md={3}>

                                                            <div className="owner_image_container">

                                                                <img className='owner_image' src={img} />
                                                                <p className='text-center mt-2'>{client_name}</p>
                                                                <hr></hr>
                                                               

                                                            </div>
                                                        </Col>
                                                        <Col md={9} className="mt-4">


                                                            <div className='Review_Round_green_container d-flex'>
                                                                <div className='rounded_green text-center'>.</div>
                                                                <div className='rounded_green text-center'>.</div>
                                                                <div className='rounded_green text-center'>.</div>
                                                                <div className='rounded_green text-center'>.</div>
                                                                <div className='rounded_green text-center'>.</div>
                                                                <span className='mx-1 review text-center'>85 reviews</span>
                                                            </div>
                                                            <h6 className="">{head}</h6>

                                                            <p className={'text'}>
                                                                {text}
                                                            </p>
                                                            <hr />
                                                        </Col>

                                                    </Row>




                                                )
                                            })}


                                        </div>
                                    </Section>
                                </ScrollingProvider>

                            </Col>
                        </Row>
                    </Col>

                    <Col md={4}>
                        <div className="mt-4">
                            <BookingForm hotel={hotel} currency={currency} daysCount={daysCount} setStep={setStep} setFormInput={setFormInput} formInput={formInput} />
                        </div>
                    </Col>
                </Row>


            </React.Fragment>
        )
    }

    if (step === 1 && hotel) {
        data = <SecureBooking currency={currency} hotel={hotel} image={images[0]} setStep={setStep} daysCount={daysCount} formInput={formInput} personalInfo={personalInfo} setPersonalInfo={setPersonalInfo} />
    }

    if (step === 2 && hotel) {
        data = <BookingComplete currency={currency} hotel={hotel} image={images[0]} daysCount={daysCount} formInput={formInput} personalInfo={personalInfo} />
    }

    return (
        <Container fluid="md" className={"p-4 pt-3"}>
            <Row className={"justify-content-center my-5"}>
                <Col md={8}>
                    <Steps current={step}>
                        <Steps.Item title="Owner Accepted" />
                        <Steps.Item title="Review" />
                        <Steps.Item title="Booked" />
                    </Steps>
                </Col>

            </Row>
            {
                !isLoading ?
                    data : (
                        <div className="text-center">
                            <Spinner animation={"border"} />
                        </div>
                    )
            }
        </Container>
    )
}

export default Home
