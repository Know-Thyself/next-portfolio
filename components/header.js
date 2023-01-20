import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../styles/header.module.css'
import Image from 'next/image'
import ThemeToggler from '../components/themes'

const Header = () => {
	const router = useRouter()
	const [toggleMenu, setToggleMenu] = useState(false)
	const [isChecked, setIsChecked] = useState(false)
	const [screenWidth, setScreenWidth] = useState(1348)

	const toggleNav = () => {
		setToggleMenu(!toggleMenu)
		setIsChecked(!isChecked)
	}

  function screenTest() {
		if (window.innerWidth <= 667) {
			toggleNav()
		}
	}

	useEffect(() => {
		const changeWidth = () => {
			setScreenWidth(window.innerWidth)
		}
		window.addEventListener('resize', changeWidth)
		return () => {
			window.removeEventListener('resize', changeWidth)
		}
	}, [])

	return (
		<header className={styles.header}>
			<Image
				className={styles.logo}
				src='/images/placeholder-logo.png'
				alt='logo'
				width={70}
				height={70}
			/>
			<div className={styles['nav_wrapper']}>
				<menu className={styles['hamburger-menu']}>
					<input
						id='menu__toggle'
						className={styles['menu__toggle']}
						type='checkbox'
						checked={isChecked}
						onChange={toggleNav}
					/>
					<label className={styles['menu__btn']} htmlFor='menu__toggle'>
						<span></span>
					</label>
					{(toggleMenu || screenWidth > 667) && (
						<nav className={styles['menu__box']}>
							<Link
								href='/'
								className={
									router.pathname === '/'
										? styles.active
										: `${styles['menu__item']} ${styles.home}`
								}
								onClick={screenTest}
							>
								{/* <a
									className={
										router.pathname === '/'
											? styles.active
											: styles['menu__item']
									}
									onClick={screenTest}
								> */}
								Home
								{/* </a> */}
							</Link>
							<Link
								href='/projects'
								className={
									router.pathname === '/projects'
										? styles.active
										: `${styles['menu__item']} ${styles.projects}`
								}
								onClick={screenTest}
							>
								{/* <a
									className={
										router.pathname === '/projects'
											? styles.active
											: styles['menu__item']
									}
									onClick={screenTest}
								> */}
								Projects
								{/* </a> */}
							</Link>
							<Link
								href='/about'
								className={
									router.pathname === '/about'
										? styles.active
										: `${styles['menu__item']} ${styles.about}`
								}
								onClick={screenTest}
							>
								{/* <a
									className={
										router.pathname === '/about'
											? styles.active
											: styles['menu__item']
									}
									onClick={screenTest}
								> */}
								About
								{/* </a> */}
							</Link>
							<Link
								href='/contact'
								className={
									router.pathname === '/contact'
										? styles.active
										: `${styles['menu__item']} ${styles.contact}`
								}
								onClick={screenTest}
							>
								{/* <a
									className={
										router.pathname === '/contact'
											? styles.active
											: styles['menu__item']
									}
									onClick={screenTest}
								> */}
								Contact
								{/* </a> */}
							</Link>
						</nav>
					)}
				</menu>
				<ThemeToggler />
			</div>
		</header>
	)
}

export default Header
