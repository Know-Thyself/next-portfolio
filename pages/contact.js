import { useState } from 'react'
import Head from 'next/head'
import styles from '../styles/contact.module.css'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import TextField from '@mui/material/TextField'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
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
				<ThemeProvider theme={theme}>
					<Box
						className={styles.box}
						component='form'
						sx={{
							'& .MuiTextField-root': {
								m: 1,
								width: '60%',
							},
						}}
						noValidate
						autoComplete='off'
					>
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
									? 'Name is required - can not be empty'
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
						<TextField
							required
							className={`${styles.message} ${styles.textField}`}
							label='Message'
							variant='filled'
							multiline
							rows={4}
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
									backgroundColor: 'var(--complementary-bg)',
								},
							}}
						/>
						<br />
						<button onClick={handleSubmit} className={styles.send}>
							{buttonText} &nbsp;
							<FontAwesomeIcon
								icon={faPaperPlane}
								className={styles['fa-paper-plane']}
							/>
						</button>
					</Box>
				</ThemeProvider>
			</main>
		</>
	)
}

export default Contact
