import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import styles from '../styles/home.module.css'
import Image from 'next/image'
import { Fragment } from 'react'

const Home = ({ about }) => {
	const springVariant = {
		start: {
			y: -100,
		},
		end: {
			y: 0,
			transition: {
				type: 'spring',
				stiffness: 50,
			},
		},
		exit: {
			y: 100,
		},
	}

	// const str = about[0].intro
	let str;
	about.forEach(val => str = val.intro)
	const image = about[0].image
	const lines = str.split(/\n/)
	const withBreaks = lines.flatMap((line, index) =>
		index > 0
			? [<br key={`br-${index}`} />, <Fragment key={index}>{line}</Fragment>]
			: [line]
	)

	return (
		<AnimatePresence>
			<motion.div
				className={styles.home}
				variants={springVariant}
				initial='start'
				animate='end'
				exit='exit'
			>
				<section className={styles.hero}>
					<div className={styles['hero-text-container']}>
						<h1 className={styles['primary-text']}>Hello & Welcome!</h1>
						<Image
							className={styles['profile-photo']}
							src={`/images/${image}`}
							width={200}
							height={200}
							alt='Author'
						/>
						<h3>Thank you for visiting my portfolio website!</h3>
						<h4 className={styles.intro}>{withBreaks}</h4>
						<div className={styles['links-wrapper']}>
							<motion.a
								href='https://github.com/Know-Thyself'
								target='_blank'
								rel='noreferrer'
								className={styles.link}
								whileHover={{
									scale: 1.2,
								}}
								whileTap={{ scale: 0.8 }}
							>
								<FontAwesomeIcon
									icon={faGithub}
									className={styles['fa-github']}
								/>
								&nbsp; GitHub
							</motion.a>
							<motion.div
								whileHover={{
									scale: 1.2,
								}}
								whileTap={{ scale: 0.8 }}
							>
								<Link href='/projects' className={styles.link}>
									Projects
								</Link>
							</motion.div>
						</div>
					</div>
				</section>
			</motion.div>
		</AnimatePresence>
	)
}

export default Home
