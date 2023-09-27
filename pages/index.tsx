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

const HomePage = ({ data }) => {
	const id = data.map((portfolio) => portfolio.id).pop()
	const about = data.map((portfolio) => portfolio.content.about)

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
			opacity: 0,
		},
		end: {
			opacity: 1,
			transition: {
				type: 'spring',
				stiffness: 60,
				duration: 0.5,
				delay: 0.5,
			},
		},
		exit: {
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
					<div className={styles['hero-text-container']}>
						<h1 className={styles['primary-text']}>Hello & Welcome!</h1>
						<Image
							className={styles['profile-photo']}
							src={`/images/${image}`}
							priority={true}
							loading='eager'
							width={200}
							height={200}
							alt='Author'
						/>
						<h3>Thank you for visiting my portfolio website!</h3>
						<h4 className={styles.intro}>{withBreaks}</h4>
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
									Projects
								</Link>
							</motion.div>
						</div>
					</div>
				</section>
			</motion.div>
		</AnimatePresence>
	)
}

export default HomePage
