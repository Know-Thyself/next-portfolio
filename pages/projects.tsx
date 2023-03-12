import Head from 'next/head'
import Button from 'react-bootstrap/Button'
import styles from '../styles/projects.module.css'
import { motion, AnimatePresence } from 'framer-motion'
import prisma from '../lib/prisma'
import Image from 'next/image'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

export const getStaticProps: GetStaticProps = async () => {
	const projectsData = await prisma.portfolio.findMany()
	return { props: { projectsData } }
}

const Projects = ({ projectsData, project, setProject }) => {
	const id = projectsData.map((portfolio) => portfolio.id).pop()
	const projects = projectsData
		.map((portfolio) => portfolio.content.projects)
		.flat()
	const router = useRouter()
	const handleClick = (e) => {
		if (
			!e.target.innerText.includes('Live Demo') &&
			!e.target.innerText.includes('GitHub')
		) {
			let selected = projects[e.currentTarget.id]
			setProject(selected)
			router.push('/details')
		}
	}

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

	return (
		<AnimatePresence>
			<Head>
				<title>Projects</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<motion.div
				className={styles['projects-main-container']}
				variants={springVariant}
				initial='start'
				animate='end'
				exit='exit'
				key='projects'
			>
				<div className={styles['projects-wrapper']}>
					{projects.map((project, idx) => {
						return (
							<div
								key={project.title}
								id={idx}
								className={styles['project-wrapper']}
								onClick={handleClick}
							>
								<h4 className={styles['project-title']}>{project.title}</h4>
								<div className={styles['image-tooltip-container']}>
									<Image
										src={`/images/${project.image}`}
										alt={project.title}
										className={styles['project-img']}
										width={340}
										height={240}
										sizes='(min-width: 300px) 100vw'
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
										href={project.url}
										target='_blank'
										rel='noreferrer'
										className={styles['live-demo-link']}
									>
										Live Demo
									</a>
								</div>
							</div>
						)
					})}
				</div>
			</motion.div>
		</AnimatePresence>
	)
}

export default Projects
