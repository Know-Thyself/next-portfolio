import React, { useState } from 'react'
import styles from '../styles/mode.module.css'

const DarkMode = ({ theme, setTheme }) => {
	const switchTheme = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light'
		setTheme(newTheme)
		theme === 'light' ? setIsChecked(false) : setIsChecked(true)
		setIsChecked(!isChecked)
	}
	const [isChecked, setIsChecked] = useState(() =>
		theme === 'dark' ? true : false
	)

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
								theme === 'dark'
									? `${styles['fa-solid']} ${styles['fa-moon']}`
									: styles['d-none']
							}
						/>
						<span className={styles['switch-button']} />
						<span className={theme === 'light' ? styles['sun-icon'] : styles['d-none']}>
							☀️
						</span>
					</label>
				</div>
			</div>
		</div>
	)
}

export default DarkMode
