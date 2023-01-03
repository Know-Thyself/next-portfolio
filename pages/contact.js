import { useState } from 'react'
import Head from 'next/head'
// import Alert from 'react-bootstrap/Alert'
// import Button from 'react-bootstrap/Button'
import styles from '../styles/contact.module.css'
// import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import TextareaAutosize from 'react-textarea-autosize'
// import IconButton from '@mui/material/IconButton'
// import Collapse from '@mui/material/Collapse'
// import Button from '@mui/material/Button'
// import CloseIcon from '@mui/icons-material/Close'
// import 'bootstrap/dist/css/bootstrap.min.css'

const Contact = () => {
	const [formInputs, setFormInputs] = useState({
		name: '',
		email: '',
		subject: '',
		message: '',
	})
	//   Form validation state
	const [errors, setErrors] = useState({})
	const [buttonText, setButtonText] = useState('Send')
	const [showSuccessMessage, setShowSuccessMessage] = useState(false)

	const handleChange = (e) => {
		setFormInputs((values) => ({
			...values,
			[e.target.name]: e.target.value,
		}))
		setErrors((values) => ({
			...values,
			[e.target.name]: false,
		}))
	}

	const formValidator = () => {
		let tempErrors = {}
		let isValid = true

		if (!formInputs.name) {
			tempErrors['name'] = true
			isValid = false
		}
		if (!formInputs.email) {
			tempErrors['email'] = true
			isValid = false
		}
		if (!formInputs.subject) {
			tempErrors['subject'] = true
			isValid = false
		}
		if (!formInputs.message) {
			tempErrors['message'] = true
			isValid = false
		}

		setErrors({ ...tempErrors })
		console.log('errors', errors)
		return isValid
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		let isValidated = formValidator()
		if (!isValidated) {
			return
		}
		const response = await fetch('/api/contact', {
			method: 'POST',
			body: JSON.stringify(formInputs),
		})
		const { error } = await response.json()
		if (error) {
			console.log(error)
			setShowSuccessMessage(false)
			setButtonText('Send')
			return
		}
		setFormInputs({
			name: '',
			email: '',
			subject: '',
			message: '',
		})
		setShowSuccessMessage(true)
		setButtonText('Send')
	}

	return (
		<>
			<Head>
				<title>Contact Me</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main className={styles.main}>
				<h1>Getting in touch is easy!</h1>
				<form onSubmit={handleSubmit} className={styles.form}>
					<label htmlFor='name' className={styles.required}>
						Name
					</label>
					<input
						id='name'
						type='text'
						name='name'
						placeholder='Enter your name'
						value={formInputs.name}
						onChange={handleChange}
					/>
					{errors.name && (
						<Alert
							className={styles['error-alert']}
							severity='error'
							onClose={() =>
								setErrors((values) => ({ ...values, ['name']: false }))
							}
						>
							<strong>Failure!</strong> — Name field should not be empty!
						</Alert>
					)}
					<br />
					<label htmlFor='email' className={styles.required}>
						Email
					</label>
					<input
						id='email'
						type='email'
						name='email'
						placeholder='Enter your email'
						value={formInputs.email}
						onChange={handleChange}
					/>
					{errors.email && (
						<Alert
							className={styles['error-alert']}
							severity='error'
							onClose={() =>
								setErrors((values) => ({ ...values, ['email']: false }))
							}
						>
							<strong>Failure!</strong> — Email field should not be empty!
						</Alert>
					)}
					<br />
					<label htmlFor='subject'>Subject</label>
					<input
						id='subject'
						type='text'
						name='subject'
						placeholder='Enter subject'
						value={formInputs.subject}
						onChange={handleChange}
					/>
					<br />
					<label htmlFor='message' className={styles.required}>
						Message
					</label>
					<TextareaAutosize
						minRows='3'
						maxRows='10'
						id='message'
						type='text'
						name='message'
						placeholder='Enter your message'
						value={formInputs.message}
						onChange={handleChange}
					/>
					{errors.message && (
						<Alert
							className={styles['error-alert']}
							severity='error'
							onClose={() =>
								setErrors((values) => ({ ...values, ['message']: false }))
							}
						>
							<strong>Failure!</strong> — Message field should not be empty!
						</Alert>
					)}
					<br />
					<button type='submit' className={styles.send}>
						{buttonText}
					</button>
				</form>
			</main>
		</>
	)
}

export default Contact
