import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../styles/header.module.css'
import Image from 'next/image'
// import DarkMode from './mode'
// import styled from '@emotion/styled'
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
			<img
				className={styles.logo}
				src='/images/placeholder-logo.png'
				alt='logo'
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
							<Link href='/'>
								<a
									className={
										router.pathname === '/'
											? styles.active
											: styles['menu__item']
									}
									onClick={screenTest}
								>
									Home
								</a>
							</Link>
							<Link href='/projects'>
								<a
									className={
										router.pathname === '/projects'
											? styles.active
											: styles['menu__item']
									}
									onClick={screenTest}
								>
									Projects
								</a>
							</Link>
							<Link href='/about'>
								<a
									className={
										router.pathname === '/about'
											? styles.active
											: styles['menu__item']
									}
									onClick={screenTest}
								>
									About
								</a>
							</Link>
							<Link href='/contact'>
								<a
									className={
										router.pathname === '/contact'
											? styles.active
											: styles['menu__item']
									}
									onClick={screenTest}
								>
									Contact
								</a>
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
