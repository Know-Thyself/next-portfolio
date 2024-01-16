import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import prisma from '../lib/prisma'
import { useRef } from 'react'
import { GetStaticProps } from 'next'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import AnimatedText from '../components/AnimatedText'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import styles from '../styles/about.module.css'

export const getStaticProps: GetStaticProps = async () => {
	const summary = await prisma.summary.findMany()
	return { props: { summary } }
}

const About = ({ summary }) => {
	const ref = useRef(null)
	const isInView = useInView(ref, { amount: 0.3 })
	const str = summary[0].bio
	const bio = str.split(/\\n/)

	const scrollVariant = {
		visible: {
			y: 0,
			opacity: 1,
			scale: 1,
			transition: { duration: 1, delay: 0.5 },
		},
		hidden: { y: 100, opacity: 0, scale: 0 },
	}

	const parentVariant = {
		visible: {
			opacity: 1,
			transition: {
				duration: 3,
				staggerChildren: 1,
				delay: 1,
			},
		},
		hidden: { opacity: 0 },
	}

	const leftVariant = {
		visible: {
			opacity: 1,
			x: 0,
			transition: {
				duration: 1,
				type: 'spring',
				stiffness: 40,
			},
		},
		hidden: { opacity: 0, x: -1000 },
	}

	const centerVariant = {
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 1,
				type: 'spring',
				stiffness: 40,
			},
		},
		hidden: { opacity: 0, y: 100 },
	}

	const rightVariant = {
		visible: {
			opacity: 1,
			x: 0,
			transition: {
				duration: 1,
				type: 'spring',
				stiffness: 40,
			},
		},
		hidden: { opacity: 0, x: 1000 },
	}

	return (
		<AnimatePresence>
			<Head>
				<title>About Me</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<motion.main
				className={styles.main}
				// variants={springVariant}
				// initial='start'
				// animate='end'
				// exit='exit'
				key={'about'}
			>
				<section className={styles['about-section']}>
					<motion.div
						className={styles['about-img-wrapper']}
						variants={scrollVariant}
						initial='hidden'
						whileInView='visible'
						viewport={{ once: true, amount: 0.5 }}
					>
						<Image
							src={'/assets/images/about.png'}
							alt='Picture of the author'
							loading='eager'
							className={`${styles['about-img']}`}
							width={240}
							height={340}
							placeholder='blur'
							blurDataURL={'/assets/images/about.png'}
							sizes='(max-width: 724px) 100vw,
              (max-width: 1200px) 50vw,
              33vw'
						/>
					</motion.div>
					<motion.div
						className={styles['about-text-wrapper']}
						variants={scrollVariant}
						initial='hidden'
						// whileInView='visible'
						animate='visible'
						// viewport={{ once: true, amount: 0.1 }}
						// variants={variant}
						// initial='hidden'
						// animate='visible'
						// exit='exit'
					>
						<AnimatedText text='About Me' el='h1' />
						{bio.map((paragraph: string, idx: number) => (
							<p key={idx}>{paragraph}</p>
						))}
						<div className={styles['about-section-buttons']}>
							<motion.div
								whileHover={{
									scale: 1.1,
									backgroundColor: 'var(--github-btn-bg)',
									color: 'var(--custom-btn-color)',
									borderRadius: '4px',
								}}
								whileTap={{ scale: 0.9 }}
							>
								<Link
									href='/contact'
									className={`btn border-0 ${styles.contact}`}
								>
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
							<motion.div
								whileHover={{
									scale: 1.1,
									backgroundColor: 'var(--github-btn-bg)',
									color: 'var(--custom-btn-color)',
									borderRadius: '4px',
								}}
								whileTap={{ scale: 0.9 }}
							>
								<button
									onClick={() =>
										alert('Resume download is currently unavailable.')
									}
									className={`btn border-0 ${styles.download}`}
								>
									Resume Download
								</button>
							</motion.div>
						</div>
					</motion.div>
				</section>
				<section
					className={styles['skills-section']}
					// variants={scrollVariant}
					// initial='hidden'
					// whileInView='visible'
					// variants={variant}
					// initial='hidden'
					// animate='visible'
					// exit='exit'
				>
					<motion.div
						ref={ref}
						initial='hidden'
						animate={isInView ? 'visible' : 'hidden'}
						transition={{
							staggerChildren: 0.5,
							duration: 1,
							delay: 0.5,
							type: 'spring',
							stiffness: 100,
							// delayChildren: 0.5,
						}}
					>
						<motion.h1 variants={leftVariant}>
							Technology Stacks & Skill Sets
						</motion.h1>
						<motion.p variants={rightVariant}>
							Technologies I love and use proficiently
						</motion.p>
					</motion.div>
					<motion.div
						className={styles['tech-stacks']}
						// variants={parentVariant}
						// whileInView='visible'
						ref={ref}
						initial='hidden'
						animate={isInView ? 'visible' : 'hidden'}
						transition={{
							staggerChildren: 1,
							duration: 1,
							delay: 1,
							type: 'spring',
							stiffness: 100,
							// delayChildren: 0.5,
						}}
						// variants={variant}
						// initial='hidden'
						// animate='visible'
						// exit='exit'
					>
						<motion.div
							className={styles['skill-card']}
							variants={centerVariant}
							// initial='hidden'
							// whileInView='visible'
						>
							<h6>Frontend Technologies</h6>
							<Link
								href='https://www.w3.org/standards/webdesign/htmlcss'
								className={styles.link}
								target='_blank'
								rel='noopener noreferrer'
							>
								<Image
									src={'/assets/images/html-css.png'}
									alt='HTML5 and CSS3 responsive design'
									loading='eager'
									className={styles.logo}
									width={300}
									height={150}
									placeholder='blur'
									blurDataURL={'/assets/images/html-css.png'}
								/>
							</Link>
							<Link
								href='https://www.javascript.com/'
								className={styles.link}
								target='_blank'
								rel='noopener noreferrer'
							>
								<Image
									src={'/assets/images/javascript.png'}
									alt='JavaScript logo'
									loading='eager'
									className={styles.logo}
									width={300}
									height={150}
									placeholder='blur'
									blurDataURL={'/assets/images/javascript.png'}
								/>
							</Link>
							<Link
								href='https://reactjs.org/'
								className={styles.link}
								target='_blank'
								rel='noopener noreferrer'
							>
								<Image
									src={'/assets/images/react.png'}
									alt='React.js'
									loading='eager'
									className={styles.logo}
									width={300}
									height={150}
									placeholder='blur'
									blurDataURL={'/assets/images/react.png'}
								/>
							</Link>
							<Link
								href='https://mui.com/'
								className={styles.link}
								target='_blank'
								rel='noopener noreferrer'
							>
								<Image
									src={'/assets/images/material-ui.png'}
									alt='Material UI'
									loading='eager'
									className={styles.logo}
									width={300}
									height={150}
									placeholder='blur'
									blurDataURL={'/assets/images/material-ui.png'}
								/>
							</Link>
							<Link
								href='https://getbootstrap.com/'
								className={styles.link}
								target='_blank'
								rel='noopener noreferrer'
							>
								<Image
									src={'/assets/images/bootstrap.jpg'}
									alt='Bootstrap'
									loading='eager'
									className={styles.logo}
									width={300}
									height={150}
									placeholder='blur'
									blurDataURL={'/assets/images/bootstrap.jpg'}
								/>
							</Link>
						</motion.div>
						<motion.div
							className={styles['skill-card']}
							variants={centerVariant}
							// initial='hidden'
							// whileInView='visible'
						>
							<h6>Collaboration & Design Tools</h6>
							<Link
								href='https://github.com/'
								className={styles.link}
								target='_blank'
								rel='noopener noreferrer'
							>
								<Image
									src={'/assets/images/git.png'}
									alt='Git and GitHub'
									loading='eager'
									className={styles.logo}
									width={300}
									height={150}
									placeholder='blur'
									blurDataURL={'/assets/images/git.png'}
								/>
							</Link>
							<Link
								href='https://www.figma.com/'
								className={styles.link}
								target='_blank'
								rel='noopener noreferrer'
							>
								<Image
									src={'/assets/images/figma.png'}
									alt='Figma'
									loading='eager'
									className={styles.logo}
									width={300}
									height={150}
									placeholder='blur'
									blurDataURL={'/assets/images/figma.png'}
								/>
							</Link>
							<Link
								href='https://trello.com/'
								className={styles.link}
								target='_blank'
								rel='noopener noreferrer'
							>
								<Image
									src={'/assets/images/trello.png'}
									alt='Trello'
									loading='eager'
									className={styles.logo}
									width={300}
									height={150}
									placeholder='blur'
									blurDataURL={'/assets/images/trello.png'}
								/>
							</Link>
							<Link
								href='https://miro.com/'
								className={styles.link}
								target='_blank'
								rel='noopener noreferrer'
							>
								<Image
									src={'/assets/images/miro.png'}
									alt='Miro logo'
									loading='eager'
									className={styles.logo}
									width={300}
									height={150}
									placeholder='blur'
									blurDataURL={'/assets/images/miro.png'}
								/>
							</Link>
							<Link
								href='https://slack.com/intl/en-gb'
								className={styles.link}
								target='_blank'
								rel='noopener noreferrer'
							>
								<Image
									src={'/assets/images/slack.jpg'}
									alt='Slack logo'
									loading='eager'
									className={styles.logo}
									width={300}
									height={150}
									placeholder='blur'
									blurDataURL={'/assets/images/slack.jpg'}
								/>
							</Link>
						</motion.div>
						<motion.div
							className={styles['skill-card']}
							variants={centerVariant}
							// initial='hidden'
							// whileInView='visible'
						>
							<h6>Backend & Full-Stack Technologies</h6>
							<Link
								href='https://nodejs.org/en/'
								className={styles.link}
								target='_blank'
								rel='noopener noreferrer'
							>
								<Image
									src={'/assets/images/node.png'}
									alt='Node.js logo'
									loading='eager'
									className={styles.logo}
									width={300}
									height={150}
									placeholder='blur'
									blurDataURL={'/assets/images/node.png'}
								/>
							</Link>
							<Link
								href='https://www.postgresql.org/'
								className={styles.link}
								target='_blank'
								rel='noopener noreferrer'
							>
								<Image
									src={'/assets/images/postgresql.jpg'}
									alt='PostgreSQL logo'
									loading='eager'
									className={styles.logo}
									width={300}
									height={150}
									placeholder='blur'
									blurDataURL={'/assets/images/postgresql.jpg'}
								/>
							</Link>
							<Link
								href='https://www.djangoproject.com/'
								className={styles.link}
								target='_blank'
								rel='noopener noreferrer'
							>
								<Image
									src={'/assets/images/django.jpg'}
									alt='Express.js logo'
									loading='eager'
									className={styles.logo}
									width={300}
									height={150}
									placeholder='blur'
									blurDataURL={'/assets/images/django.jpg'}
								/>
							</Link>
							<Link
								href='https://nextjs.org/'
								className={styles.link}
								target='_blank'
								rel='noopener noreferrer'
							>
								<Image
									src={'/assets/images/next.png'}
									alt='Next.js logo'
									loading='eager'
									className={styles.logo}
									width={300}
									height={150}
									placeholder='blur'
									blurDataURL={'/assets/images/next.png'}
								/>
							</Link>
							<Link
								href='https://flask.palletsprojects.com/en/3.0.x/'
								className={styles.link}
								target='_blank'
								rel='noopener noreferrer'
							>
								<Image
									src={'/assets/images/flask.jpg'}
									alt='Prisma logo'
									loading='eager'
									className={styles.logo}
									width={300}
									height={150}
									placeholder='blur'
									blurDataURL={'/assets/images/flask.jpg'}
								/>
							</Link>
						</motion.div>
					</motion.div>
				</section>
			</motion.main>
		</AnimatePresence>
	)
}

export default About
