import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from '../styles/themes.module.css'

const ThemeToggler = () => {
	const [theme, setTheme] = useState('dark')
	const [isChecked, setIsChecked] = useState(() =>
		theme === 'dark' ? true : false
	)
	const switchTheme = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light'
		setTheme(newTheme)
		theme === 'light' ? setIsChecked(false) : setIsChecked(true)
		setIsChecked(!isChecked)
	}

	useEffect(() => {
		document.body.dataset.theme = theme
	}, [theme])

	return (
		<div className={styles['theme-icons-and-radio-btn']}>
			<div className={styles['radio-switch']}>
				<div className={styles['light-dark-mode']}>
					<input
						className={styles['switch-checkbox']}
						id='radio-button'
						name='dark-mode'
						value='dark-mode'
						type='checkbox'
						checked={isChecked}
						onChange={switchTheme}
					/>
					<label className={styles['switch-label']} htmlFor='radio-button'>
						<i
							className={
								theme === 'dark' ? 'fa-solid fa-moon' : styles['d-none']
							}
						/>
						<span className={styles['switch-button']} />
						<span
							className={
								theme === 'light' ? styles['sun-icon'] : styles['d-none']
							}
						>
							☀️
						</span>
					</label>
				</div>
			</div>
		</div>
	)
}

export default ThemeToggler
