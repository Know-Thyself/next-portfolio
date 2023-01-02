const email = require('@sendgrid/mail')
email.setApiKey(process.env.SENDGRID_API_KEY)

const sendEmail = async (req, res) => {
	try {
		const body = JSON.parse(req.body)
		const message = `
	  Name: ${body.name}\r\n
	  Email: ${body.email}\r\n
		Subject: ${body.subject}\r\n
	  Message: ${body.message}
	`
		await email.send({
			to: `${process.env.RECEIVER_EMAIL}`,
			from: `${process.env.SENDER_EMAIL}`,
			subject: `New message from ${body.name}`,
			text: message,
			html: message.replace(/\r\n/g, '<br />'),
		})
	} catch (err) {
		res.status(err.statusCode || 500).json({ error: err.message })
		return
	}

	res.status(200).json({ msg: 'Your email is successfully sent!' })
}

export default sendEmail
