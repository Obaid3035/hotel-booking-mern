import sgMail from '@sendgrid/mail';

const apiKey = process.env.SENDGRAM_API_KEY

sgMail.setApiKey(apiKey);

const bookingConfirmation = (data) => {

	sgMail
		.send({
			to: data.booking.email, // Change to your recipient
			from: 'obaid3035@gmail.com', // Change to your verified sender
			subject: 'Booking Information',
			html: `<div style="padding:100px">
				<div style="text-align: center;">
					<h1>
						<img alt="LOGO" width="50px" height="50px"
						     src="https://res.cloudinary.com/thiaza/image/upload/v1648126313/footer_logo_t89ttr.png"/>Trip
						Advisor
					</h1>
					<h2>Thanks for booking on TripAdvisor</h2>
					<p>You'll find important information about you'r booking below. We hope you have great stay!</p>
					<h2>Booking Reference: ${data.bookingReference}</h2>
				</div>
				<div style="display:flex; width:50%;margin:0 auto">
					<div style="width:50%">
						<img alt="SIDE_IMG" style="max-width: 100%"
						     src="${data.image}"/>
					</div>
					<div style="width:50% ;padding-left:30px;">
						<p>
							${data.hotelName}
						</p>
						<p>
							${data.booking.startDate} - ${data.booking.endDate}
						</p>

						<p>
							${data.guestCount} Guests
						</p>

						<p><b>Total </b> ${data.currency}${data.total}</p>
					</div>
				</div>
				<div style="width:50%;margin:0 auto;margin-top: 30px;">
					<button
						style="width: 100%; height:50px;border-radius:20px;background-color:#f5bd1f;color:black;border:none">See
						booking details
					</button>
				</div>
				<div style="width:50%;margin:0 auto;margin-top: 30px;">
					<button
						style="width: 100%; height:50px;border-radius:20px;background-color:#f5bd1f;color: black;border:none">Download
						invoice
					</button>
				</div>


				<div style="margin: 0 auto;width:50%;">
					<h4 style="margin-top: 30px;text-align:center">Important information</h4>
					<h5>Customer details</h5>
					<span>${data.booking.name}</span>
					<br>
						<a href=${data.booking.email}>${data.booking.email}</a>

						<h5 style="margin-top: 30px">Cancellation Policy</h5>
						<p>Cancel before 3:00 PM on Apr 29,2022 and get a full refund,minus the service fee</p>

						<img src="https://res.cloudinary.com/thiaza/image/upload/v1648211235/email_img_nrarev.png" height="50%"
						     width="100%"/>
				</div>

				<footer>
					<div style="margin: 0 auto;width:50%;margin-top: 20px;background-color: rgb(240, 240, 240);padding:20px">
						TripAdvisor LLC, <a href="#">400 1st Ave.,Needham,MA 02494,USA</a>

						<p>
							Please do not reply directly to this email.This email was sent from a notification-only address that
							cannot accept incoming email
						</p>

						<p>
							2022 TripAdvisor LLC.All ..gnts reserved.TripAdvisor,the TripAdvisor logo,the Owl logo and Get The
							Truth.Then Go.are either registered trademarks or trademarks of TripAdvisor LLC in the U.S, and/or
							other countries
						</p>
						<div style="display: flex;gap:10px;margin: 0 auto; width: 100%;justify-content: center;">
							<p style="border-bottom:2px solid grey;width:140px;text-align:center">
								Go to Tripadvisor
							</p>
							|

							<p style="border-bottom:2px solid grey;width:140px;text-align:center">
								Privacy Policy
							</p>
						</div>
					</div>
				</footer>

			</div>`
		})
		.then(() => {
			console.log("Email Sent")
		})
		.catch((error) => {
			console.error(error.response.body.errors);
			return false;
		});
};
export default bookingConfirmation;
