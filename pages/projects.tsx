import Head from 'next/head'
import styles from '../styles/projects.module.css'
import { motion, AnimatePresence } from 'framer-motion'
import AnimatedText from '../components/text-animation'
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
	const projects = await prisma.projects.findMany()
	return { props: { projects } }
}

const Projects = ({ projects, setProject }) => {
	const router = useRouter()
	projects.sort((a: object | any, b: object | any) => a.id - b.id)

	const scrollVariant = {
		visible: (index: number) => ({
			opacity: 1,
			scale: 1,
			transition: {
				duration: 1,
				delay: 0.3 * index,
			},
		}),
		hidden: { opacity: 0, scale: 0 },
	}

	return (
		<AnimatePresence>
			<Head>
				<title>Projects</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div className={`${styles['projects-main-container']}`} key='projects'>
				<AnimatedText
					text='CHECK OUT MY PROJECTS'
					el='h4'
					className={styles['page-title']}
				/>
				<div className={styles['projects-wrapper']}>
					{projects.map((project: object | any, index: number) => {
						return (
							<motion.div
								key={project.id}
								className={styles['project-wrapper']}
								onClick={() => {
									setProject(project)
									router.push('/details')
								}}
								variants={scrollVariant}
								initial='hidden'
								whileInView='visible'
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.9 }}
								viewport={{ amount: 0.1 }}
								custom={index}
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
										priority={true}
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
