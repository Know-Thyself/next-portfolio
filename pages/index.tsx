import Head from 'next/head'
import prisma from '../lib/prisma'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import styles from '../styles/home.module.css'
import Image from 'next/image'
import 'bootswatch/dist/sandstone/bootstrap.min.css'
import MultiCarousel from '../components/carousel'
import AnimatedText from '../components/AnimatedText'
import { useRef } from 'react'

export const getStaticProps: GetStaticProps = async () => {
	const projects = await prisma.projects.findMany()
	const summary = await prisma.summary.findMany()
	return { props: { projects, summary } }
}

function HomePage({ summary, projects }): JSX.Element {
	const images = projects.map(project => project.image)
	const str = summary[0].profile
	const image = summary[0].image
	const intro = str.split(/\\n/)
	const ref = useRef(null)
	const isInView = useInView(ref, { amount: 0.5, once: true })

	const variant = {
		visible: {
			opacity: 1,
			scale: 1,
			y: 0,
			transition: { type: 'spring', stiffness: 30 },
		},
		hidden: { opacity: 0, scale: 0, y: -100 },
		exit: {
			opacity: 0,
			scale: 0,
			y: 30,
		},
	}

	const leftBracket = {
		visible: {
			opacity: 1,
			x: 0,
			transition: { type: 'spring', stiffness: 30 },
		},
		hidden: { opacity: 0, x: -300 },
	}

	const rightBracket = {
		visible: {
			opacity: 1,
			x: 0,
			transition: { type: 'spring', stiffness: 30 },
		},
		hidden: { opacity: 0, x: 300 },
	}

	return (
		<AnimatePresence>
			<Head>
				<title>Biruk | Full-Stack Developer</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<motion.div
				className={styles.home}
				key={'Welcome'}
				ref={ref}
				initial='hidden'
				animate={isInView ? 'visible' : 'hidden'}
				transition={{ staggerChildren: 1.5, delay: 1 }}
			>
				<motion.div variants={variant}>
					<MultiCarousel images={images} />
				</motion.div>
				<motion.div
					className={styles['top-left-bracket']}
					variants={leftBracket}
				>
					<div className={styles['horizontal-bar']}></div>
					<div className={styles['vertical-bar']}></div>
				</motion.div>
				<motion.section className={styles.hero} variants={variant}>
					<AnimatedText text={'Hello & Welcome!'} className={styles.banner} />
					<div className={styles['hero-text-container']}>
						<div className={styles['image-wrapper']}>
							<Image
								className={styles['profile-photo']}
								src={`/assets/images/${image}`}
								loading='eager'
								width={200}
								height={200}
								alt='Author'
								placeholder='blur'
								blurDataURL={`/assets/images/${image}`}
							/>
						</div>
						{intro.map((paragraph: string, idx: number) => (
							// <p key={idx} className={styles.intro}>
							// 	{paragraph}
							// </p>
							<AnimatedText
								key={idx}
								text={paragraph}
								className={styles.intro}
							/>
						))}
					</div>
					<div className={styles['links-wrapper']}>
						<motion.div
							whileHover={{
								scale: 1.2,
								borderRadius: '4px',
								backgroundColor: 'var(--custom-btn-bg)',
								color: 'var(--custom-btn-color)',
							}}
							whileTap={{ scale: 0.8 }}
						>
							<Link
								href='/projects'
								className={`btn border-0 ${styles['projects-link']}`}
							>
								Projects
							</Link>
						</motion.div>
						<motion.a
							href='https://github.com/Know-Thyself'
							target='_blank'
							rel='noreferrer'
							className={`btn border-0 ${styles['github-link']}`}
							whileHover={{
								scale: 1.2,
								backgroundColor: 'var(--github-btn-bg)',
								color: 'var(--custom-btn-color)',
							}}
							whileTap={{ scale: 0.8 }}
						>
							<FontAwesomeIcon
								icon={faGithub}
								className={styles['fa-github']}
							/>
							<span>&nbsp; GitHub</span>
						</motion.a>
					</div>
				</motion.section>
				<motion.div
					className={styles['right-bottom-bracket']}
					variants={rightBracket}
				>
					<div className={styles['bottom-vertical-bar']}></div>
					<div className={styles['bottom-horizontal-bar']}></div>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	)
}

export default HomePage
