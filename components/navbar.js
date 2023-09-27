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
		<header
			className={`${
				styles['custom-header']
			} navbar navbar-expand-md border-0 fixed-bottom ${
				theme === 'dark' ? 'bg-dark' : 'bg-primary'
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
				<button
					className='navbar-toggler border-0'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarNavDropdown'
					aria-controls='navbarNavDropdown'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					{/* <span className='navbar-toggler-icon'></span> */}
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
				</button>

				<nav
					className={`collapse navbar-collapse text-center me-auto me-md-5`}
					data-toggle='collapse'
					data-target='.navbar-collapse'
					id='navbarNavDropdown'
				>
					<ul className='navbar-nav ms-auto border-0 fs-6 fw-semibold me-md-5 pe-md-5'>
						<li className={`nav-item rounded ${styles['custom-nav-item']}`}>
							<Link
								href='/'
								className={`btn nav-link px-3 ${
									router.pathname === '/' ? 'active border-0' : ''
								} ${theme === 'light' ? 'text-light' : 'text-body-secondary'}`}
								// onClick={screenTest}
							>
								<span
									data-bs-target='#navbarNavDropdown'
									data-bs-toggle={`${screenWidth <= 768 ? 'collapse' : ''}`}
								>
									Home
								</span>
							</Link>
						</li>
						<li className={`nav-item rounded ${styles['custom-nav-item']}`}>
							<Link
								href='/projects'
								className={`btn nav-link px-3 ${
									router.pathname === '/projects' ? 'active border-0' : ''
								} ${theme === 'light' ? 'text-light' : 'text-body-secondary'}`}
								// onClick={screenTest}
							>
								<span
									data-bs-target='#navbarNavDropdown'
									data-bs-toggle={`${screenWidth <= 768 ? 'collapse' : ''}`}
								>
									Projects
								</span>
							</Link>
						</li>
						<li className={`nav-item rounded ${styles['custom-nav-item']}`}>
							<Link
								href='/about'
								className={`btn nav-link px-3 ${
									router.pathname === '/about' ? 'active border-0' : ''
								} ${theme === 'light' ? 'text-light' : 'text-body-secondary'}`}
								// onClick={screenTest}
							>
								<span
									data-bs-target='#navbarNavDropdown'
									data-bs-toggle={`${screenWidth <= 768 ? 'collapse' : ''}`}
								>
									About
								</span>
							</Link>
						</li>
						<li className={`nav-item rounded ${styles['custom-nav-item']}`}>
							<Link
								href='/contact'
								className={`btn nav-link px-3 ${
									router.pathname === '/contact' ? 'active border-0' : ''
								} ${theme === 'light' ? 'text-light' : 'text-body-secondary'}`}
								// onClick={screenTest}
							>
								<span
									data-bs-target='#navbarNavDropdown'
									data-bs-toggle={`${screenWidth <= 768 ? 'collapse' : ''}`}
								>
									Contact
								</span>
							</Link>
						</li>
					</ul>
				</nav>
				<ThemeToggler theme={theme} setTheme={setTheme} />
			</div>
		</header>
	)
}

export default Navbar
