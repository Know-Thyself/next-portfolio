import { useState } from 'react'
import Head from 'next/head'
import styles from '../styles/contact.module.css'

const Contact = () => {
	const [form, setForm] = useState({
		name: '',
		email: '',
		subject: '',
		message: '',
	})
	const handleChange = (e) => {
		setForm((values) => ({
			...values,
			[e.target.name]: e.target.value,
		}))
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		const response = await fetch('/api/contact', {
			method: 'POST',
			body: JSON.stringify(form),
		})
		const { error } = await response.json()
		if (error) {
			console.log(error)
			return
		}
		setForm({
			name: '',
			email: '',
			subject: '',
			message: '',
		})
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
					<label htmlFor='name'>Name:</label>
					<input
						id='name'
						type='text'
						name='name'
						value={form.name}
						onChange={handleChange}
					/>
					<label htmlFor='email'>Email:</label>
					<input
						id='email'
						type='email'
						name='email'
						value={form.email}
						onChange={handleChange}
					/>
					<label htmlFor='subject'>Subject:</label>
					<input
						id='subject'
						type='text'
						name='subject'
						value={form.subject}
						onChange={handleChange}
					/>
					<label htmlFor='message'>Message:</label>
					<textarea
						id='message'
						type='text'
						rows='4'
						name='message'
						value={form.message}
						onChange={handleChange}
					/>
					<button type='submit'>Send</button>
				</form>
			</main>
		</>
	)
}

export default Contact
