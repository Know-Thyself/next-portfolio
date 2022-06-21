import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../styles/nav.module.css'
import Image from 'next/image'

const Nav = ({ projectsData }) => {
	const router = useRouter()
	const [toggleMenu, setToggleMenu] = useState(false)
	const [screenWidth, setScreenWidth] = useState(1366)
	const [collapse, setCollapse] = useState(false)

	function screenTest(e) {
		if (screenWidth <= 667) {
			setCollapse(true)
			setToggleMenu(false)
		} else if (!toggleMenu) {
			setCollapse(false)
			setToggleMenu(true)
		}
	}

	const toggleNav = () => {
		setToggleMenu(!toggleMenu)
		setCollapse(false)
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
								<Link href='/'>
									<a
										onClick={screenTest}
										className={
											router.pathname === '/' ? styles.active : styles.link
										}
									>
										Home
									</a>
								</Link>
							</li>
							<li>
								<Link href='/videos'>
									<a
										onClick={screenTest}
										className={
											router.pathname === '/videos'
												? styles.active
												: styles.link
										}
									>
										Videos
									</a>
								</Link>
							</li>
							<li>
								<Link href='/images'>
									<a
										onClick={screenTest}
										className={
											router.pathname === '/images'
												? styles.active
												: styles.link
										}
									>
										Images
									</a>
								</Link>
							</li>
							<li>
								<Link href='/blogs'>
									<a
										onClick={screenTest}
										className={
											router.pathname === '/blogs' ? styles.active : styles.link
										}
									>
										Blogs
									</a>
								</Link>
							</li>
							<li>
								<Link href='/projects'>
									<a
										onClick={screenTest}
										className={
											router.pathname === '/projects'
												? styles.active
												: styles.link
										}
									>
										Projects
									</a>
								</Link>
							</li>
							<li>
								<Link href='/about'>
									<a
										onClick={screenTest}
										className={
											router.pathname === '/about' ? styles.active : styles.link
										}
									>
										About
									</a>
								</Link>
							</li>
							<li>
								<Link href='/contact'>
									<a
										onClick={screenTest}
										className={
											router.pathname === '/contact'
												? styles.active
												: styles.link
										}
									>
										Contact
									</a>
								</Link>
							</li>
							<li>
								<Link href='/login'>
									<a
										onClick={screenTest}
										className={
											router.pathname === '/login' ? styles.active : styles.link
										}
									>
										Login
									</a>
								</Link>
							</li>
							<li>
								<Link href='/signup'>
									<a
										onClick={screenTest}
										className={
											router.pathname === '/signup'
												? styles.active
												: styles.link
										}
									>
										Signup
									</a>
								</Link>
							</li>
						</ul>
					</nav>
				)}
				<FontAwesomeIcon
					className={`${styles.fas} ${styles['fa-bars']}`}
					icon={faBars}
					onClick={toggleNav}
				/>
			</div>
		</menu>
	)
}

export default Nav
