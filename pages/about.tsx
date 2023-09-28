import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import prisma from '../lib/prisma'
import { GetStaticProps } from 'next'
import { Fragment } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from '../styles/about.module.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

export const getStaticProps: GetStaticProps = async () => {
	const data = await prisma.portfolio.findMany()
	return { props: { data } }
}

const About = ({ data }) => {
	const about = data.map(portfolio => portfolio.content.about)
	const str = about[0].bio
	// const image = about[0].image
	const lines = str.split(/\n/)
	const withBreaks = lines.flatMap((line, index) =>
		index > 0
			? [<br key={`br-${index}`} />, <Fragment key={index}>{line}</Fragment>]
			: [line]
	)
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
							priority={true}
							loading='eager'
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
						<p>{withBreaks}</p>
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
						<p>Technologies I love and use proficiently</p>
					</div>
					<div className={styles['tech-stacks']}>
						<div className={styles['skill-card']}>
							<h6>Frontend Technologies</h6>
							<Link
								href='https://www.w3.org/standards/webdesign/htmlcss'
								className={styles.link}
								target='_blank'
								rel='noopener noreferrer'
							>
								<Image
									src='/images/html-css.png'
									alt='HTML5 and CSS3 responsive design'
									priority={true}
									loading='eager'
									className={styles.logo}
									width={300}
									height={150}
								/>
							</Link>
							<Link
								href='https://www.javascript.com/'
								className={styles.link}
								target='_blank'
								rel='noopener noreferrer'
							>
								<Image
									src='/images/javascript.png'
									alt='JavaScript logo'
									priority={true}
									loading='eager'
									className={styles.logo}
									width={300}
									height={150}
								/>
							</Link>
							<Link
								href='https://reactjs.org/'
								className={styles.link}
								target='_blank'
								rel='noopener noreferrer'
							>
								<Image
									src='/images/react.png'
									alt='React.js'
									priority={true}
									loading='eager'
									className={styles.logo}
									width={300}
									height={150}
								/>
							</Link>
							<Link
								href='https://mui.com/'
								className={styles.link}
								target='_blank'
								rel='noopener noreferrer'
							>
								<Image
									src='/images/material-ui.png'
									alt='Material UI'
									priority={true}
									loading='eager'
									className={styles.logo}
									width={300}
									height={150}
								/>
							</Link>
							<Link
								href='https://getbootstrap.com/'
								className={styles.link}
								target='_blank'
								rel='noopener noreferrer'
							>
								<Image
									src='/images/bootstrap.jpg'
									alt='Bootstrap'
									priority={true}
									loading='eager'
									className={styles.logo}
									width={300}
									height={150}
								/>
							</Link>
						</div>
						<div className={styles['skill-card']}>
							<h6>Collaboration & Design Tools</h6>
							<Link
								href='https://github.com/'
								className={styles.link}
								target='_blank'
								rel='noopener noreferrer'
							>
								<Image
									src='/images/git.png'
									alt='Git and GitHub'
									priority={true}
									loading='eager'
									className={styles.logo}
									width={300}
									height={150}
								/>
							</Link>
							<Link
								href='https://www.figma.com/'
								className={styles.link}
								target='_blank'
								rel='noopener noreferrer'
							>
								<Image
									src='/images/figma.png'
									alt='Figma'
									priority={true}
									loading='eager'
									className={styles.logo}
									width={300}
									height={150}
								/>
							</Link>
							<Link
								href='https://trello.com/'
								className={styles.link}
								target='_blank'
								rel='noopener noreferrer'
							>
								<Image
									src='/images/trello.png'
									alt='Trello'
									priority={true}
									loading='eager'
									className={styles.logo}
									width={300}
									height={150}
								/>
							</Link>
							<Link
								href='https://miro.com/'
								className={styles.link}
								target='_blank'
								rel='noopener noreferrer'
							>
								<Image
									src='/images/miro.png'
									alt='Miro logo'
									priority={true}
									loading='eager'
									className={styles.logo}
									width={300}
									height={150}
								/>
							</Link>
							<Link
								href='https://slack.com/intl/en-gb'
								className={styles.link}
								target='_blank'
								rel='noopener noreferrer'
							>
								<Image
									src='/images/slack.jpg'
									alt='Slack logo'
									priority={true}
									loading='eager'
									className={styles.logo}
									width={300}
									height={150}
								/>
							</Link>
						</div>
						<div className={styles['skill-card']}>
							<h6>Backend & Full-Stack Technologies</h6>
							<Link
								href='https://nodejs.org/en/'
								className={styles.link}
								target='_blank'
								rel='noopener noreferrer'
							>
								<Image
									src='/images/node.png'
									alt='Node.js logo'
									priority={true}
									loading='eager'
									className={styles.logo}
									width={300}
									height={150}
								/>
							</Link>
							<Link
								href='https://www.postgresql.org/'
								className={styles.link}
								target='_blank'
								rel='noopener noreferrer'
							>
								<Image
									src='/images/postgresql.jpg'
									alt='PostgreSQL logo'
									priority={true}
									loading='eager'
									className={styles.logo}
									width={300}
									height={150}
								/>
							</Link>
							<Link
								href='https://expressjs.com/'
								className={styles.link}
								target='_blank'
								rel='noopener noreferrer'
							>
								<Image
									src='/images/express.png'
									alt='Express.js logo'
									priority={true}
									loading='eager'
									className={styles.logo}
									width={300}
									height={150}
								/>
							</Link>
							<Link
								href='https://nextjs.org/'
								className={styles.link}
								target='_blank'
								rel='noopener noreferrer'
							>
								<Image
									src='/images/next.png'
									alt='Next.js logo'
									priority={true}
									loading='eager'
									className={styles.logo}
									width={300}
									height={150}
								/>
							</Link>
							<Link
								href='https://www.prisma.io/'
								className={styles.link}
								target='_blank'
								rel='noopener noreferrer'
							>
								<Image
									src='/images/prisma.png'
									alt='Prisma logo'
									priority={true}
									loading='eager'
									className={styles.logo}
									width={300}
									height={150}
								/>
							</Link>
						</div>
					</div>
				</section>
			</motion.main>
		</AnimatePresence>
	)
}

export default About
