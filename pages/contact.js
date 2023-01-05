import { useState } from 'react'
import Head from 'next/head'
import styles from '../styles/contact.module.css'
// import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import TextField from '@mui/material/TextField'
import TextareaAutosize from 'react-textarea-autosize'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

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

	const isEmail = (email) =>
		/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)

	const formValidator = () => {
		let tempErrors = {}
		let isValid = true
		if (!formInputs.name) {
			tempErrors['name'] = true
			isValid = false
		}
		if (!formInputs.email) {
			tempErrors['email'] = {
				isError: true,
				errorMessage: 'Email field can not be empty',
			}
			isValid = false
		} else if (!isEmail(formInputs.email)) {
			tempErrors['email'] = {
				isError: true,
				errorMessage: 'Please enter a valid email',
			}
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
		let isValid = formValidator()
		if (!isValid) {
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
						autoComplete='off'
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
						type='text'
						name='email'
						placeholder='Enter your email'
						autoComplete='off'
						value={formInputs.email}
						onChange={handleChange}
					/>
					{errors.email && errors.email.isError && (
						<Alert
							className={styles['error-alert']}
							severity='error'
							onClose={() =>
								setErrors((values) => ({ ...values, ['email']: false }))
							}
						>
							<strong>Failure!</strong> — {errors.email.errorMessage}!
						</Alert>
					)}
					<br />
					<label htmlFor='subject'>Subject</label>
					<input
						id='subject'
						type='text'
						name='subject'
						placeholder='Enter subject'
						autoComplete='off'
						value={formInputs.subject}
						onChange={handleChange}
					/>
					<br />
					<label htmlFor='message' className={styles.required}>
						Message
					</label>
					<TextareaAutosize
						className={styles.message}
						minRows='4'
						maxRows='8'
						id='message'
						type='text'
						name='message'
						placeholder='Enter your message'
						autoComplete='off'
						value={formInputs.message}
						onChange={handleChange}
						style={{ height: 'fit-content' }}
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
						{buttonText} &nbsp;
						<FontAwesomeIcon
							icon={faPaperPlane}
							className={styles['fa-paper-plane']}
						/>
					</button>
				</form>
			</main>
		</>
	)
}

export default Contact
