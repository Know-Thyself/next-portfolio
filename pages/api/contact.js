const mail = require('@sendgrid/mail')
// const dotenv = require('dotenv').config()
mail.setApiKey(process.env.SENDGRID_API_KEY)

export default async (req, res) => {
	const body = JSON.parse(req.body)

	const message = `
	  Name: ${body.name}\r\n
	  Email: ${body.email}\r\n
	  Message: ${body.message}
	`
	//const message = { Name: body.name, Email: body.email, Message: body.message }

	const data = {
		to: `${process.env.RECEIVER_EMAIL}`,
		from: `${process.env.SENDER_EMAIL}`,
		subject: `New message from ${body.name}`,
		text: message,
		html: message.replace(/\r\n/g, '<br />'),
	}

	await mail.send(data)

	res.status(200).json({ status: 'OK' })
}
