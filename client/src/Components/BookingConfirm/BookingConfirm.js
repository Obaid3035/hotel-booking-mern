import React from 'react'
import '../BookingConfirm/BookingConfirm.css'

const BookingConfirm = () => {
    return (
        <>

            <div className='booking_container'>

                <h6 className='Logo_text text-center'>TripAdvisor</h6>
                <h4 className='thanks_text text-center'>Thanks for booking on Tripadvisor</h4>
                <p className='text-center'>You 'll find important about your booking below.We hope you have a great stay!</p>

                <h5 className='booking_text text-center'>Booking reference: F913rE</h5>

                <div className='card_container d-flex mt-4'>

                    <div className="mx-2">
                     <img src = 'https://picsum.photos/id/1018/1000/600/' width={400} height={300} />
                    </div>

                    <div className="mx-2">
                       <span>Quietly Location in Berlin Splendid Apartment</span>
                    </div>


                </div>





            </div>



        </>
    )
}

export default BookingConfirm