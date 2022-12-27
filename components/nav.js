import React, { useState, useEffect } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useRouter } from 'next/router'
//import styles from '../styles/nav.module.css'
import Image from 'next/image'

const Nav = ({ projectsData }) => {
	const router = useRouter()
	const [toggleMenu, setToggleMenu] = useState(false)
	const [screenWidth, setScreenWidth] = useState(1366)
	const [collapse, setCollapse] = useState(false)

	function screenTest(e) {
		if (screenWidth <= 667) {
			// setCollapse(true)
			// setToggleMenu(false)
			toggleNav()
		} else if (!toggleMenu) {
			setCollapse(false)
			setToggleMenu(true)
		}
	}

	const toggleNav = () => {
		setToggleMenu(!toggleMenu)
		setCollapse(!collapse)
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
		<menu className={styles.menu}>
			<div className={styles.wrapper}>
				<Link href='/' onClick={screenTest}>
					<a>
						<Image
							src='/images/Share-nobg.png'
							alt='Logo of the author'
							className={styles.logo}
							width={74}
							height={60}
						/>
					</a>
				</Link>
				{(toggleMenu || screenWidth > 667) && (
					<nav className={styles.nav}>
						<ul id='nav' className={collapse ? styles.single : styles.list}>
							<li>
								<Link
									href='/home'
									onClick={screenTest}
									className={
										router.pathname === '/' ? styles.active : styles.link
									}
								>
									Home
								</Link>
							</li>
							<li>
								<Link
									href='/videos'
									onClick={screenTest}
									className={
										router.pathname === '/videos' ? styles.active : styles.link
									}
								>
									Videos
								</Link>
							</li>
							<li>
								<Link
									href='/images'
									onClick={screenTest}
									className={
										router.pathname === '/images' ? styles.active : styles.link
									}
								>
									Images
								</Link>
							</li>
							<li>
								<Link
									href='/blogs'
									onClick={screenTest}
									className={
										router.pathname === '/blogs' ? styles.active : styles.link
									}
								>
									Blogs
								</Link>
							</li>
							<li>
								<Link
									href='/projects'
									onClick={screenTest}
									className={
										router.pathname === '/projects'
											? styles.active
											: styles.link
									}
								>
									Projects
								</Link>
							</li>
							<li>
								<Link
									href='/about'
									onClick={screenTest}
									className={
										router.pathname === '/about' ? styles.active : styles.link
									}
								>
									About
								</Link>
							</li>
							<li>
								<Link
									href='/contact'
									onClick={screenTest}
									className={
										router.pathname === '/contact' ? styles.active : styles.link
									}
								>
									Contact
								</Link>
							</li>
							<li>
								<Link
									href='/login'
									onClick={screenTest}
									className={
										router.pathname === '/login' ? styles.active : styles.link
									}
								>
									Login
								</Link>
							</li>
							<li>
								<Link
									href='/signup'
									onClick={screenTest}
									className={
										router.pathname === '/signup' ? styles.active : styles.link
									}
								>
									Signup
								</Link>
							</li>
						</ul>
					</nav>
				)}
				{toggleMenu ? (
					<FontAwesomeIcon
						className={`${styles.fas} ${styles['fa-xmark']}`}
						icon={faXmark}
						onClick={toggleNav}
					/>
				) : (
					<FontAwesomeIcon
						className={`${styles.fas} ${styles['fa-bars']}`}
						icon={faBars}
						onClick={toggleNav}
					/>
				)}
			</div>
		</menu>
	)
}

export default Nav
