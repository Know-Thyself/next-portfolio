import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import styles from '../styles/home.module.css'
import Image from 'next/image'

const Home = () => {
	const springVariant = {
		start: {
			y: -100,
			// opacity: 0,
		},
		end: {
			y: 0,
			// opacity: 1,
			transition: {
				type: 'spring',
				// bounce: 0.25,
				stiffness: 50,
				// damping: 10,
				// restSpeed: 0.5,
				// velocity: 3,
				// restDelta: 0.5,
			},
		},
		exit: {
			y: 100,
			// opacity: 0,
		},
	}

	return (
		<AnimatePresence mode='wait'>
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
							src='/images/profile-photo.png'
							width={200}
							height={200}
							alt='Biruk'
						/>
						<h3 className={styles.subtext}>
							Biruk here, I am a Full Stack Web Developer specialized in HTML,
							CSS, JavaScript, React.js, Next.js, Node.js and PostgreSQL
							Database along with related Frameworks and Libraries.
							<br />
							<br />
							If you are looking to hire a passionate, problem solver, team
							player, effective communicator and skillful Software Engineer for
							a frontend, backend or full stack web development role, you have
							come to the right place!
						</h3>
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
									{/* <a className={styles.link}> */}
										Projects
										{/* </a> */}
								</Link>
							</motion.div>
						</div>
					</div>
					{/* <div className='hero-right'>
					<h3>Some content here</h3>
				</div> */}
				</section>
			</motion.div>
		</AnimatePresence>
	)
}

export default Home
