import Link from 'next/link'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import styles from '../styles/home.module.css'
import Image from 'next/image'

const Home = ({ data }) => {
	const summary = data[0].profile
	const image = data[0].image
	const intro = summary.split(/\\n/)

	const variants = {
		start: {
			y: -100,
			opacity: 0,
		},
		end: {
			y: 0,
			opacity: 1,
			transition: {
				type: 'spring',
				stiffness: 60,
			},
		},
		exit: {
			y: 100,
			opacity: 0,
		},
	}

	return (
		<motion.div
			className={styles.home}
			variants={variants}
			initial='start'
			animate='end'
			exit='exit'
			key={'Welcome'}
		>
			<section className={styles.hero}>
				<h1 className={styles.banner}>Hello & Welcome!</h1>
				<div className={styles['hero-text-container']}>
					<Image
						className={styles['profile-photo']}
						src={`/assets/images/${image}`}
						priority={true}
						loading='eager'
						width={200}
						height={200}
						alt='Author'
					/>
					{intro.map((paragraph: string, idx: number) => (
						<p key={idx} className={styles.intro}>
							{paragraph}
						</p>
					))}
				</div>
				<div className={styles['links-wrapper']}>
					<motion.a
						href='https://github.com/Know-Thyself'
						target='_blank'
						rel='noreferrer'
						className={`btn btn-dark border-0 ${styles.link}`}
						whileHover={{
							scale: 1.2,
						}}
						whileTap={{ scale: 0.8 }}
					>
						<FontAwesomeIcon
							icon={faGithub}
							className={`${styles['fa-github']}`}
						/>
						&nbsp; GitHub
					</motion.a>
					<motion.div
						whileHover={{
							scale: 1.2,
						}}
						whileTap={{ scale: 0.8 }}
					>
						<Link
							href='/projects'
							className={`btn btn-dark border-0 ${styles.link}`}
						>
							Projects
						</Link>
					</motion.div>
				</div>
			</section>
		</motion.div>
	)
}

export default Home
