import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../styles/header.module.css'
import Image from 'next/image'
import ThemeToggler from './themes'

const Navbar = () => {
	const router = useRouter()
	const [theme, setTheme] = useState('dark')
	const [toggleMenu, setToggleMenu] = useState(false)
	const [isChecked, setIsChecked] = useState(false)
	const [screenWidth, setScreenWidth] = useState(1348)

	const toggleNav = () => {
		setToggleMenu(!toggleMenu)
		setIsChecked(!isChecked)
	}

	function screenTest() {
		if (window.innerWidth <= 767) {
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
		<header
			className={`${
				styles['custom-header']
			} navbar navbar-expand-md border-0 fixed-top ${
				theme === 'dark' ? 'bg-primary' : 'bg-secondary'
			}`}
			data-bs-theme={theme}
		>
			<div class='container-fluid'>
				<Link className='navbar-brand border-0 mx-3' href='/'>
					<Image
						className={`${styles.logo}`}
						src='/images/logo.png'
						priority={true}
						loading='eager'
						alt='logo'
						width={70}
						height={70}
					/>
				</Link>
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
				{(toggleMenu || screenWidth > 767) && (
					<nav className={`text-center me-auto me-md-5 ${styles['menu__box']}`}>
						<ul
							className={`navbar-nav ms-auto border-0 fs-6 fw-semibold me-md-5 pe-md-5 ${styles['menu__box__ul']}`}
						>
							<li className={`nav-item ${styles['custom-nav-item']}`}>
								<Link
									href='/'
									className={`btn nav-link px-3 ${
										router.pathname === '/'
											? 'active border-0'
											: styles['menu__item']
									} ${
										theme === 'light'
											? 'text-primary-emphasis'
											: 'text-body-secondary'
									}`}
									onClick={screenTest}
								>
									<span className='text-uppercase'>Home</span>
								</Link>
							</li>
							<li className={`nav-item ${styles['custom-nav-item']}`}>
								<Link
									href='/projects'
									className={`btn nav-link px-3 ${
										router.pathname === '/projects'
											? 'active border-0'
											: styles['menu__item']
									} ${
										theme === 'light'
											? 'text-primary-emphasis'
											: 'text-body-secondary'
									}`}
									onClick={screenTest}
								>
									<span className='text-uppercase'>Projects</span>
								</Link>
							</li>
							<li className={`nav-item ${styles['custom-nav-item']}`}>
								<Link
									href='/about'
									className={`btn nav-link px-3 ${
										router.pathname === '/about'
											? 'active border-0'
											: styles['menu__item']
									} ${
										theme === 'light'
											? 'text-primary-emphasis'
											: 'text-body-secondary'
									}`}
									onClick={screenTest}
								>
									<span className='text-uppercase'>About</span>
								</Link>
							</li>
							<li className={`nav-item ${styles['custom-nav-item']}`}>
								<Link
									href='/contact'
									className={`btn nav-link px-3 ${
										router.pathname === '/contact'
											? 'active border-0'
											: styles['menu__item']
									} ${
										theme === 'light'
											? 'text-primary-emphasis'
											: 'text-body-secondary'
									}`}
									onClick={screenTest}
								>
									<span className='text-uppercase'>Contact</span>
								</Link>
							</li>
						</ul>
					</nav>
				)}
				<ThemeToggler theme={theme} setTheme={setTheme} />
			</div>
		</header>
	)
}

export default Navbar
