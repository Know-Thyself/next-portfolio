import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import styles from '../styles/about.module.css'
import profileImage from '../public/images/about.png'
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
		},
		end: {
			y: 0,
			transition: {
				type: 'spring',
				stiffness: 60,
			},
		},
		exit: {
			y: 100,
		},
	}

	return (
		<AnimatePresence>
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
				key='about'
			>
				<section className={styles['about-section']}>
					<div className={styles['about-img-wrapper']}>
						<Image
							src='/images/about.png'
							alt='Picture of the author'
							className={`${styles['about-img']}`}
							width={240}
							height={340}
							sizes='(max-width: 724px) 100vw,
              (max-width: 1200px) 50vw,
              33vw'
						/>
					</div>
					<div className={styles['about-text-wrapper']}>
						<h1>About Me</h1>
						<p>
							I am from theological studies background and I had been a
							bishop/pastor of a Church for most of my adult life.
							<br />
							<br />
							I embarked on an adventurous journey of becoming a computer
							programmer in 2020 when I joined the most amazing coding boot
							camp, CodeYourFuture! Joining CodeYourFuture has literally
							transformed my life in many ways and is the best thing ever
							happened to me in a very long time.
							<br />
							<br />I am also a father of two children who are currently
							studying Computer Science and IT at a university. <br />
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
									Contact Me
								</Link>
							</motion.div>

							{/* <motion.div
								className={styles.download}
								whileHover={{
									scale: 1.1,
								}}
								whileTap={{ scale: 0.9 }}
							>
								<Link
									download
									href='/assets/resume.pdf'
									alt='alt text'
									target='_blank'
									rel='noopener noreferrer'
									locale={false}
								>
									Resume Download
								</Link>
							</motion.div> */}
							<motion.button
								className={styles.download}
								whileHover={{
									scale: 1.1,
								}}
								whileTap={{ scale: 0.9 }}
								onClick={() =>
									alert('Resume download is currently unavailable.')
								}
							>
								Resume Download
							</motion.button>
						</div>
					</div>
				</section>
				<section className={styles['skills-section']}>
					<div>
						<h1>Technology Stacks & Skill Sets</h1>
						<p>
							Here&apos;re some images of the Technology Stacks I use
							proficiently to build frontend, backend and full stack web
							applications
						</p>
					</div>
					<div className={styles['tech-stacks']}>
						<div className={styles['skill-card']}>
							<h6>Frontend Technologies</h6>
							<Image
								src='/images/html-css.png'
								alt='HTML5 and CSS3 responsive design'
								className={styles.logo}
								width={300}
								height={150}
							/>
							<Image
								src='/images/javascript.png'
								alt='JavaScript logo'
								className={styles.logo}
								width={300}
								height={150}
							/>
							<Image
								src='/images/react.png'
								alt='React.js'
								className={styles.logo}
								width={300}
								height={150}
							/>
							<Image
								src='/images/material-ui.png'
								alt='Material UI'
								className={styles.logo}
								width={300}
								height={150}
							/>
							<Image
								src='/images/bootstrap.jpg'
								alt='Bootstrap'
								className={styles.logo}
								width={300}
								height={150}
							/>
						</div>
						<div className={styles['skill-card']}>
							<h6>Collaboration & Design Tools</h6>
							<Image
								src='/images/git.png'
								alt='Git and GitHub'
								className={styles.logo}
								width={300}
								height={150}
							/>
							<Image
								src='/images/figma.png'
								alt='Figma'
								className={styles.logo}
								width={300}
								height={150}
							/>
							<Image
								src='/images/trello.png'
								alt='Trello'
								className={styles.logo}
								width={300}
								height={150}
							/>
							<Image
								src='/images/miro.png'
								alt='Miro logo'
								className={styles.logo}
								width={300}
								height={150}
							/>
							<Image
								src='/images/slack.jpg'
								alt='Slack logo'
								className={styles.logo}
								width={300}
								height={150}
							/>
						</div>
						<div className={styles['skill-card']}>
							<h6>Backend & Full-Stack Technologies</h6>
							<Image
								src='/images/node.png'
								alt='Node.js logo'
								className={styles.logo}
								width={300}
								height={150}
							/>
							<Image
								src='/images/postgresql.jpg'
								alt='PostgreSQL logo'
								className={styles.logo}
								width={300}
								height={150}
							/>
							<Image
								src='/images/express.png'
								alt='Express.js logo'
								className={styles.logo}
								width={300}
								height={150}
							/>
							<Image
								src='/images/next.png'
								alt='Next.js logo'
								className={styles.logo}
								width={300}
								height={150}
							/>
							<Image
								src='/images/prisma.png'
								alt='Prisma logo'
								className={styles.logo}
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
