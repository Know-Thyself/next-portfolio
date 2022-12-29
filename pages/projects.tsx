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
		if (e.target.innerText !== 'Live Demo' && e.target.innerText !== 'GitHub') {
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
				bounce: 0.25,
				stiffness: 40,
				damping: 10,
				restSpeed: 0.5,
				velocity: 3,
				restDelta: 0.5,
			},
		},
		exit: {
			y: 100,
			opacity: 0,
		},
	}

	// return (
	// 	<section id={id} className={styles.section}>
	// 		<Head>
	// 			<title>projects</title>
	// 			<link rel='icon' href='/favicon.ico' />
	// 		</Head>
	// 		<h1 className={styles.header}>Checkout some of my projects</h1>
	// 		<div className={styles.projectsWrapper}>
	// 			{projects.map((project, index) => {
	// 				const projectImage = '/images/' + project.image
	// 				return (
	// 					<div key={index} id={index} className={styles.projects}>
	// 						<h3 className={styles.title}>{project.title}</h3>
	// 						<div className={styles.images}>
	// 							<a href={project.url} className={styles.imageLink}>
	// 								<Image
	// 									src={projectImage}
	// 									alt={project.title}
	// 									className={styles.images}
	// 									layout='fill'
	// 									objectFit='cover'
	// 								/>
	// 							</a>
	// 						</div>
	// 						<div className={styles.mouseover}>
	// 							<a href={project.url} className={styles.center}>
	// 								<span
	// 									className={styles.mouseoverText}
	// 								>{`Click to view live demo of ${project.title}`}</span>
	// 							</a>
	// 						</div>
	// 						<div className={styles.modalButtonAndLinks}>
	// 							<div className={styles.modals}></div>
	// 							<div key='github' className={styles.links}>
	// 								<Button href={project.url} className={styles.liveDemo}>
	// 									Live Demo
	// 								</Button>
	// 								<Button
	// 									href={project.repository}
	// 									className={styles.githubLink}
	// 								>
	// 									<i className='fa fa-github github' aria-hidden='true'></i>
	// 									&nbsp;GitHub
	// 								</Button>
	// 							</div>
	// 						</div>
	// 					</div>
	// 				)
	// 			})}
	// 		</div>
	// 	</section>
	// )
	return (
		<AnimatePresence exitBeforeEnter>
			<motion.div
				className={styles['projects-main-container']}
				variants={springVariant}
				initial='start'
				animate='end'
				exit='exit'
			>
				<div className={styles['projects-wrapper']}>
					{projects.map((project, idx) => {
						return (
							<div
								key={idx}
								id={idx}
								className={styles['project-wrapper']}
								onClick={handleClick}
							>
								<h4 className={styles['project-title']}>{project.title}</h4>
								<div className={styles['image-tooltip-container']}>
									<img src={`/images/${project.image}`} alt='' />
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
