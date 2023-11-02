import Head from 'next/head'
import prisma from '../lib/prisma'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import styles from '../styles/home.module.css'
import Image from 'next/image'
import 'bootswatch/dist/sandstone/bootstrap.min.css'
import MultiCarousel from '../components/carousel'

// export const getStaticProps: GetStaticProps = async () => {
// 	const summary = await prisma.summary.findMany()
// 	return { props: { summary } }
// }

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
				key={'Welcome'}
			>
            <MultiCarousel images={images} />
				<section className={styles.hero}>
					<h1 className={styles.banner}>Hello & Welcome!</h1>
					<div className={styles['hero-text-container']}>
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
						{intro.map((paragraph: string, idx: number) => (
							<p key={idx} className={styles.intro}>
								{paragraph}
							</p>
						))}
					</div>
					<div className={styles['links-wrapper']}>
						<motion.a
							href='https://github.com/Know-Thyself'
							target='_blank'
							rel='noreferrer'
							className={`btn btn-primary border-0 text-white ${styles.link}`}
							whileHover={{
								scale: 1.2,
								borderRadius: '4px',
							}}
							whileTap={{ scale: 0.8 }}
						>
							<FontAwesomeIcon
								icon={faGithub}
								className={styles['fa-github']}
							/>
							<span>&nbsp; GitHub</span>
						</motion.a>
						<motion.div
							whileHover={{
								scale: 1.2,
								borderRadius: '4px',
							}}
							whileTap={{ scale: 0.8 }}
						>
							<Link
								href='/projects'
								className={`btn btn-primary border-0 ${styles.link}`}
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
