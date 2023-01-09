import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import styles from '../styles/about.module.css'
import profileImage from '../public/images/about.png'

const About = () => {
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
		<AnimatePresence mode='wait'>
			<Head>
				<title>About Me</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<motion.main
				className={styles['about-page-main-container']}
				variants={springVariant}
				initial='start'
				animate='end'
				exit='exit'
			>
				<div className={styles['about-page-wrapper']}>
					<div className={styles['about-img-wrapper']}>
						<img
							src='/images/about.png'
							alt='Biruk'
							className={`${styles['about-img']}`}
							// layout='intrinsic'
							// layout='fill'
							// objectFit='contain'
							// width={200}
							// style={{ width: '200px', height: 'auto' }}
						/>
					</div>
					<div className={styles['about-text-wrapper']}>
						<h1>About Me</h1>
						<p>
							I am a father of two children who are currently studying
							Computer Science and IT at a university.
							<br />
							<br />
							I started coding in 2020 when I joined the most amazing
							coding bootcamp, CodeYourFuture! Joining CodeYourFuture has
							literally transformed my life in many ways and is the best thing
							ever happened to me in a very long time. <br />
							<br />
							I&apos;m currently volunteering as a Teaching Assistant and
							Technical Mentor at CodeYourFuture to give back to my wonderful
							community and learn more as I teach trainee developers.
						</p>
						<div className={styles['about-section-buttons']}>
							<motion.div
								whileHover={{
									scale: 1.1,
								}}
								whileTap={{ scale: 0.9 }}
							>
								<Link href='/contact' className={styles.contact}>
									{/* <a className={styles.contact}> */}
									Contact Me
									{/* </a> */}
								</Link>
							</motion.div>

							<motion.button
								whileHover={{
									scale: 1.1,
								}}
								whileTap={{ scale: 0.9 }}
							>
								Resume Download
							</motion.button>
						</div>
					</div>
				</div>
				<section className={styles['skills-section']}>
					<div className={styles['tech-stacks']}>
						<div className={styles['skill-card']}></div>
						<div className={styles['skill-card']}></div>
						<div className={styles['skill-card']}></div>
					</div>
				</section>
			</motion.main>
		</AnimatePresence>
	)
}

export default About
