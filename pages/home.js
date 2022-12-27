import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import styles from '../styles/home.module.css'

const Home = () => {
	const springVariant = {
		start: {
			y: -100,
			opacity: 0,
		},
		end: {
			y: 0,
			opacity: 1,
			transition: {
				type: 'spring',
				bounce: 0.25,
				stiffness: 40,
				damping: 10,
				restSpeed: 0.5,
				velocity: 3,
				restDelta: 0.5,
			},
		},
		exit: {
			y: 100,
			opacity: 0,
		},
	}

	return (
		<AnimatePresence exitBeforeEnter>
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
						<img
							className={styles['profile-photo']}
							src='/images/profile-photo.png'
							alt=''
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
								<i
									className={styles['fa-brands fa-github']}
								></i>
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
					{/* <div className='hero-right'>
					<h3>Some content here</h3>
				</div> */}
				</section>
			</motion.div>
		</AnimatePresence>
	)
}

export default Home
