import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import styles from '../styles/about.module.css'
import profileImage from '../public/images/about.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faPaperPlane,
	faPhoneVolume,
	faEnvelope,
	faMapLocationDot,
} from '@fortawesome/free-solid-svg-icons'
import { faHtml5, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

const About = () => {
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
				stiffness: 60,
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
			<Head>
				<title>About Me</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<motion.main
				className={styles.main}
				variants={springVariant}
				initial='start'
				animate='end'
				exit='exit'
			>
				<section className={styles['about-section']}>
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
							I am a father of two children who are currently studying Computer
							Science and IT at a university.
							<br />
							<br />
							I started coding in 2020 when I joined the most amazing coding
							bootcamp, CodeYourFuture! Joining CodeYourFuture has literally
							transformed my life in many ways and is the best thing ever
							happened to me in a very long time. <br />
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
				</section>
				<section className={styles['skills-section']}>
					<div>
						<h1>Technology Stacks and Skill Sets</h1>
						<p>
							Here&apos;re some of the Technology Stacks I use very
							competently and passionately to build frontend, backend and full
							stack web applications
						</p>
					</div>
					<div className={styles['tech-stacks']}>
						<div className={styles['skill-card']}>
							<h2>Frontend Technologies</h2>
							<Image
								src='/images/html-css.png'
								alt='HTML5 and CSS3 responsive design'
								className={styles.logo}
								// layout='intrinsic'
								// objectFit='contain'
								width={300}
								height={150}
								// style={{ width: '200px', height: 'auto' }}
							/>
							<Image
								src='/images/javascript.png'
								alt='JavaScript logo'
								className={styles.logo}
								// layout='intrinsic'
								// objectFit='contain'
								width={300}
								height={150}
								// style={{ width: '200px', height: 'auto' }}
							/>
							<Image
								src='/images/react.png'
								alt='React.js'
								className={styles.logo}
								// layout='intrinsic'
								// layout='fill'
								// objectFit='contain'
								width={300}
								height={150}
								// style={{ width: '200px', height: 'auto' }}
							/>
							<Image
								src='/images/bootstrap.jpg'
								alt='Bootstrap'
								className={styles.logo}
								// layout='intrinsic'
								// layout='fill'
								// objectFit='contain'
								width={300}
								height={150}
								// style={{ width: '200px', height: 'auto' }}
							/>
							<Image
								src='/images/material-ui.png'
								alt='Material UI'
								className={styles.logo}
								// layout='intrinsic'
								// layout='fill'
								// objectFit='contain'
								width={300}
								height={150}
								// style={{ width: '200px', height: 'auto' }}
							/>
						</div>
						<div className={styles['skill-card']}>
							<h2>Collaboration and Design Tools</h2>
							<Image
								src='/images/git.png'
								alt='Git and GitHub'
								className={styles.logo}
								// layout='intrinsic'
								// layout='fill'
								// objectFit='contain'
								width={300}
								height={150}
								// style={{ width: '200px', height: 'auto' }}
							/>
							<Image
								src='/images/figma.png'
								alt='Figma'
								className={styles.logo}
								// layout='intrinsic'
								// layout='fill'
								// objectFit='contain'
								width={300}
								height={150}
								// style={{ width: '200px', height: 'auto' }}
							/>
							<Image
								src='/images/trello.png'
								alt='Trello'
								className={styles.logo}
								// layout='intrinsic'
								// objectFit='contain'
								width={300}
								height={150}
							/>
							<Image
								src='/images/miro.png'
								alt='Miro logo'
								className={styles.logo}
								// layout='intrinsic'
								// objectFit='contain'
								width={300}
								height={150}
							/>
							<Image
								src='/images/slack.jpg'
								alt='Slack logo'
								className={styles.logo}
								// layout='intrinsic'
								// objectFit='contain'
								width={300}
								height={150}
							/>
						</div>
						<div className={styles['skill-card']}>
							<h2>Backend and Full Stack Technologies</h2>
							<Image
								src='/images/node.png'
								alt='Node.js logo'
								className={styles.logo}
								// layout='intrinsic'
								// objectFit='contain'
								width={300}
								height={150}
							/>
							<Image
								src='/images/express.png'
								alt='Express.js logo'
								className={styles.logo}
								// layout='intrinsic'
								// objectFit='contain'
								width={300}
								height={150}
							/>
							<Image
								src='/images/postgresql.jpg'
								alt='PostgreSQL logo'
								className={styles.logo}
								// layout='intrinsic'
								// objectFit='contain'
								width={300}
								height={150}
							/>
							<Image
								src='/images/next.png'
								alt='Next.js logo'
								className={styles.logo}
								// layout='intrinsic'
								// objectFit='contain'
								width={300}
								height={150}
							/>
							<Image
								src='/images/prisma.png'
								alt='Prisma logo'
								className={styles.logo}
								// layout='intrinsic'
								// objectFit='contain'
								width={300}
								height={150}
							/>
						</div>
					</div>
				</section>
			</motion.main>
		</AnimatePresence>
	)
}

export default About
