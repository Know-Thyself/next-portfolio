import Head from 'next/head'
import styles from '../styles/projects.module.css'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import prisma from '../lib/prisma'
import Image from 'next/image'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'

export const getStaticProps: GetStaticProps = async () => {
	const projects = await prisma.projects.findMany()
	return { props: { projects } }
}

const Projects = ({ projects, setProject }) => {
	const router = useRouter()
	projects.sort((a: object | any, b: object | any) => a.id - b.id)
	const images = projects.map(project => {
		let projectsList = { title: project.title, image: project.image }
		return projectsList
	})
	const control = useAnimation()
	const [ref, inView] = useInView()

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
				stiffness: 60,
			},
		},
		exit: {
			y: 100,
			opacity: 0,
		},
	}

	const scrollVariant = {
		visible: {
			opacity: 1,
			scale: 1,
			y: 0,
			transition: { duration: 1, delay: 0.3, type: 'spring', stiffness: 40 },
		},
		hidden: { opacity: 0, scale: 0, y: 100 },
	}

	useEffect(() => {
		if (inView) {
			control.start('visible')
		} else {
			control.start('hidden')
		}
	}, [control, inView])

	return (
		<AnimatePresence>
			<Head>
				<title>Projects</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div
				className={`${styles['projects-main-container']}`}
				// variants={springVariant}
				// initial='start'
				// animate='end'
				// exit='exit'
				key='projects'
			>
				<h4 className={styles['page-title']}>CHECK OUT MY PROJECTS</h4>
				<div className={styles['projects-wrapper']}>
					{projects.map((project: object | any) => {
						return (
							<motion.div
								key={project.id}
								className={styles['project-wrapper']}
								onClick={() => {
									setProject(project)
									router.push('/details')
								}}
								ref={ref}
								variants={scrollVariant}
								initial='hidden'
								// animate={control}
								whileInView='visible'
								whileHover={{ scale: 0.9 }}
								whileTap={{ scale: 1.1 }}
								viewport={{ amount: 0.5 }}
							>
								<h4 className={styles['project-title']}>{project.title}</h4>
								<div className={styles['image-tooltip-container']}>
									<Image
										src={`/assets/images/${project.image}`}
										alt={project.title}
										loading='eager'
										className={styles['project-img']}
										width={340}
										height={240}
										sizes='(min-width: 300px) 100vw'
										placeholder='blur'
										blurDataURL={`/assets/images/${project.image}`}
									/>
									<span className={styles.tooltip}>
										Click to view project details
									</span>
								</div>
								<div className={styles['project-links-wrapper']}>
									<a
										href={project.repository}
										target='_blank'
										rel='noreferrer'
										className={styles['github-link']}
									>
										<FontAwesomeIcon
											icon={faGithub}
											className={styles['fa-github']}
										/>
										&nbsp; GitHub
									</a>
									<a
										href={project.demo}
										target='_blank'
										rel='noreferrer'
										className={styles['live-demo-link']}
									>
										Live Demo
									</a>
								</div>
							</motion.div>
						)
					})}
				</div>
			</div>
		</AnimatePresence>
	)
}

export default Projects
