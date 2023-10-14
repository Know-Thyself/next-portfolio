import React, { useState } from 'react'
import Head from 'next/head'
import styles from '../styles/contact.module.css'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion, AnimatePresence } from 'framer-motion'
import {
	faPaperPlane,
	faPhoneVolume,
	faEnvelope,
	faMapLocationDot,
} from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import { ThemeProvider, createTheme } from '@mui/material/styles'
export const theme = createTheme({
	components: {
		MuiFormLabel: {
			styleOverrides: {
				asterisk: {
					color: '#db3131',
					'&$error': {
						color: '#db3131',
					},
				},
			},
		},
	},
})

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

	const handleChange = e => {
		setFormInputs(values => ({
			...values,
			[e.target.name]: e.target.value,
		}))
		setErrors(values => ({
			...values,
			[e.target.name]: false,
		}))
	}

	const isEmail = email =>
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
				errorMessage: 'Email is required',
			}
			isValid = false
		} else if (!isEmail(formInputs.email)) {
			tempErrors['email'] = {
				isError: true,
				errorMessage: 'Invalid email!',
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
		return isValid
	}

	const handleSubmit = async e => {
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

	const springVariant = {
		start: {
			y: -100,
		},
		end: {
			y: 0,
			transition: {
				type: 'spring',
				stiffness: 50,
			},
		},
		exit: {
			y: 100,
		},
	}

	return (
		<AnimatePresence>
			<Head>
				<title>Contact Me</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<motion.main
				className={styles.main}
				variants={springVariant}
				initial='start'
				animate='end'
				exit='exit'
				key='contact'
			>
				<section className={styles.intro}>
					<h1>Contact Me</h1>
					<p>
						If you are an employer or recruiter looking for a developer or if
						you run a charity organisation and would like me to build a website
						for your organisation which I am happy to do for free or just to get
						to know me better, please get in touch using your preferred means of
						communication from the options provided below.
					</p>
				</section>
				<div className={styles.wrapper}>
					<aside className={styles['contact-info']}>
						<h4>Contact Info</h4>
						<p>
							<FontAwesomeIcon
								icon={faPhoneVolume}
								className={styles['fa-phone-volume']}
							/>
							&nbsp; +44 7392 976062
						</p>
						<p>
							<FontAwesomeIcon icon={faEnvelope} /> &nbsp; birukwebdev@gmail.com
						</p>
						<p>
							<FontAwesomeIcon icon={faMapLocationDot} /> &nbsp; 63 Sandy Lane,
							CV1 4EX, West Midlands, Coventry, UK
						</p>
						<div className={styles.anchors}>
							<a
								href='https://github.com/Know-Thyself'
								target='_blank'
								rel='noreferrer'
								className={styles.link}
							>
								<FontAwesomeIcon
									icon={faGithub}
									className={styles['fa-brand']}
								/>
							</a>
							<a
								href='https://www.linkedin.com/in/biruk-kebede-8b44b7209/'
								target='_blank'
								rel='noreferrer'
								className={styles.link}
							>
								<FontAwesomeIcon
									icon={faLinkedin}
									className={styles['fa-brand']}
								/>
							</a>
						</div>
					</aside>
					<ThemeProvider theme={theme}>
						<Box
							className={styles.box}
							component='form'
							sx={{
								'& .MuiTextField-root': {
									m: 1,
									width: '100%',
								},
							}}
							noValidate
							autoComplete='off'
						>
							<div className={styles['text-fields']}>
								<TextField
									className={styles.textField}
									required
									label='Name'
									variant='filled'
									name='name'
									value={formInputs.name}
									onChange={handleChange}
									error={errors.name}
									helperText={
										errors['name']
											? 'Name is required'
											: 'Please enter your name'
									}
									InputProps={{ disableUnderline: true }}
									sx={{
										'& .MuiFormHelperText-root': {
											color: 'var(--helper-text-color)',
										},
									}}
								/>
								<TextField
									className={styles.textField}
									required
									label='Email'
									variant='filled'
									name='email'
									value={formInputs.email}
									onChange={handleChange}
									error={errors.email}
									helperText={
										errors['email']
											? errors.email.errorMessage
											: 'Please enter your email'
									}
									InputProps={{ disableUnderline: true }}
									sx={{
										'& .MuiFormHelperText-root': {
											color: 'var(--helper-text-color)',
										},
									}}
								/>
								<TextField
									className={styles.textField}
									label='Subject'
									variant='filled'
									name='subject'
									value={formInputs.subject}
									onChange={handleChange}
									helperText='Please enter the subject'
									InputProps={{ disableUnderline: true }}
									sx={{
										'& .MuiFormHelperText-root': {
											color: 'var(--helper-text-color)',
										},
									}}
								/>
							</div>
							<div className={styles['message-wrapper']}>
								<TextField
									required
									className={`${styles.message} ${styles.textField}`}
									label='Message'
									variant='filled'
									multiline
									minRows={5}
									maxRows={10}
									name='message'
									value={formInputs.message}
									onChange={handleChange}
									error={errors.message}
									helperText={
										errors['message']
											? 'Message is required'
											: 'Please enter your message'
									}
									InputProps={{ disableUnderline: true }}
									sx={{
										'& .MuiFormHelperText-root': {
											color: 'var(--helper-text-color)',
										},
										'& .Mui-error': {
											color: '#f44336',
										},
										'& .MuiInputBase-root': {
											color: 'var(--primary-text-color)',
											borderBottom: '1px solid var(--primary-text-color)',
											backgroundColor: 'var(--tertiary-bg)',
										},
									}}
								/>
							</div>
							<br />
							<button
								onClick={handleSubmit}
								className={`btn btn-dark ${styles.send}`}
							>
								{buttonText} &nbsp;
								<FontAwesomeIcon
									icon={faPaperPlane}
									className={styles['fa-paper-plane']}
								/>
							</button>
						</Box>
					</ThemeProvider>
				</div>
			</motion.main>
		</AnimatePresence>
	)
}

export default Contact
