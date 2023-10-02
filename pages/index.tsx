import Head from 'next/head'
import prisma from '../lib/prisma'
import { GetStaticProps } from 'next'
// import Home from './home'
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
import 'bootswatch/dist/slate/bootstrap.min.css'

export const getStaticProps: GetStaticProps = async () => {
	const data = await prisma.portfolio.findMany()
	return { props: { data } }
}

function HomePage({ data }): JSX.Element {
	const id = data.map((portfolio: { id: any }) => portfolio.id).pop()
	const about = data.map(
		(portfolio: { content: { about: any } }) => portfolio.content.about
	)

	const str = about[0].intro
	const image = about[0].image
	const lines = str.split(/\n/)
	const withBreaks = lines.flatMap((line, index) =>
		index > 0
			? [<br key={`br-${index}`} />, <Fragment key={index}>{line}</Fragment>]
			: [line]
	)
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
		<AnimatePresence>
			<Head>
				<title>Biruk | Full-Stack Developer</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<motion.div
				className={styles.home}
				variants={variants}
				initial='start'
				animate='end'
				exit='exit'
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
						{/* <h4>Thank you for visiting my portfolio website!</h4> */}
						<h5 className={styles.intro}>{withBreaks}</h5>
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
		</AnimatePresence>
	)
}

export default HomePage
