import Head from 'next/head'
import Button from 'react-bootstrap/Button'
import styles from '../styles/projects.module.css'
import prisma from '../lib/prisma'
import Image from 'next/image'
import { GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps = async () => {
	const projectsData = await prisma.portfolio.findMany()
	return { props: { projectsData } }
}

const Projects = ({ projectsData }) => {
	const id = projectsData.map((portfolio) => portfolio.id).pop()
	const projects = projectsData
		.map((portfolio) => portfolio.portfolioData.portfolio.projects)
		.flat()
	return (
		<section id={id} className={styles.section}>
			<Head>
				<title>projects</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			{/* <Zoom> */}
			<h1 className={styles.header}>Checkout some of my projects</h1>
			<div className={styles.projectsWrapper}>
				{projects.map((project, index) => {
					const projectImage = '/images/' + project.image
					return (
						<div
							key={index}
							id={index}
							className={styles.projects}
							// data-aos={randomAnimation}
						>
							<h3 className={styles.title}>{project.title}</h3>
							<div className={styles.images}>
								<a href={project.url} className={styles.imageLink}>
									<Image
										src={projectImage}
										alt={project.title}
										className={styles.images}
										layout='fill'
										objectFit='cover'
									/>
								</a>
							</div>
							<div className={styles.mouseover}>
								<a href={project.url} className={styles.center}>
									<span
										className={styles.mouseoverText}
									>{`Click to view live demo of ${project.title}`}</span>
								</a>
							</div>
							<div className={styles.modalButtonAndLinks}>
								<div className={styles.modals}>
									{/* <ProjectModal
										title={project.title}
										description={project.description}
										live={project.url}
										github={project.repository}
									/> */}
								</div>
								<div key='github' className={styles.links}>
									<Button href={project.url} className={styles.liveDemo}>
										Live Demo
									</Button>
									<Button
										href={project.repository}
										className={styles.githubLink}
									>
										<i className='fa fa-github github' aria-hidden='true'></i>
										&nbsp;GitHub
									</Button>
								</div>
							</div>
						</div>
					)
				})}
			</div>
			{/* </Zoom> */}
		</section>
	)
}

export default Projects
