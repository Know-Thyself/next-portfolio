import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../styles/nav.module.css'
import Image from 'next/image'

const Nav = ({projectsData}) => {
  const router = useRouter()
	const [toggleMenu, setToggleMenu] = useState(false)
	const [screenWidth, setScreenWidth] = useState(1366)
	const [collapse, setCollapse] = useState(false)
	//const projectImage = '../images/' + project.image

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
							src='/images/logo.png'
							alt='Logo of the author'
							className={styles.logo}
							width={66}
							height={63}
						/>
					</a>
				</Link>
				{(toggleMenu || screenWidth > 667) && (
					<ul id='nav' className={collapse ? styles.single : styles.list}>
						<li
							// className={styles.link}
							className={router.pathname === '/' ? styles.active : styles.link}
						>
							<Link href='/'>
								<a onClick={screenTest} className={styles['smooth-scroll']}>
									Home
								</a>
							</Link>
						</li>
						<li
							className={
								router.pathname === '/projects' ? styles.active : styles.link
							}
						>
							<Link href='/projects'>
								<a onClick={screenTest} className={styles['smooth-scroll']}>
									Projects
								</a>
							</Link>
						</li>
						<li
							className={
								router.pathname === '/about' ? styles.active : styles.link
							}
						>
							<Link href='/about'>
								<a onClick={screenTest} className={styles['smooth-scroll']}>
									About
								</a>
							</Link>
						</li>
						<li
							className={
								router.pathname === '/contact' ? styles.active : styles.link
							}
						>
							<Link href='/contact'>
								<a onClick={screenTest} className={styles['smooth-scroll']}>
									Contact
								</a>
							</Link>
						</li>
					</ul>
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
			
			
			
			
			
