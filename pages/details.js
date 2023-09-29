import Head from 'next/head'
import { useState, ReactElement } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import styles from '../styles/details.module.css'

const ProjectDetail = ({ project }) => {
	const [showMore, setShowMore] = useState(false)
	let descriptionLines, lessText
	if (project.description) {
		descriptionLines = project.description.split(/\n/)
		lessText = descriptionLines.join(' ').slice(0, 300)
	}

	const toggleText = () => {
		setShowMore(!showMore)
	}

	return (
		<motion.main
			className={styles['main-container']}
			key='main'
			initial={{ opacity: 0.5 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0.5 }}
		>
			<Head>
				<title>Project Details</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<div className={styles.container}>
				<div>
					<Link
						href='/projects'
						className={`btn btn-primary border-0 ${styles['back-btn']}`}
					>
						<FontAwesomeIcon className={styles['fa-left']} icon={faArrowLeft} />
						Back To Projects
					</Link>
				</div>
				{descriptionLines && (
					<div className={styles['project-wrapper']}>
						<h4 className={styles['project-title']}>{project.title}</h4>
						<Image
							src={`/images/${project.image}`}
							alt={project.title}
							priority={true}
							loading='eager'
							className={styles['project-img']}
							width={340}
							height={280}
							sizes='(min-width: 300px) 100vw'
						/>
						<div className={styles['read-more-read-less-wrapper']}>
							{descriptionLines.join(' ').length >= lessText.length ? (
								<div key='read-more'>
									{!showMore ? (
										<p className={styles.description}>
											<b style={{ fontWeight: 'bold' }}>
												{project.title}&nbsp;
											</b>
											{lessText.replace("''", "'")}
											<span key='span' onClick={toggleText}>
												{!showMore ? '...read more ▼' : 'read less ▲'}
											</span>
										</p>
									) : (
										descriptionLines.map((line, idx) => (
											<div key={idx}>
												<p className={styles.description}>
													{idx === 0 && (
														<b style={{ fontWeight: 'bold' }}>
															{project.title}&nbsp;
														</b>
													)}
													{line.replace("''", "'")}
													{idx === descriptionLines.length - 1 && (
														<span key='span' onClick={toggleText}>
															{!showMore ? '...read more ▼' : 'read less ▲'}
														</span>
													)}
												</p>
											</div>
										))
									)}
								</div>
							) : (
								descriptionLines.map((line, idx) => (
									<div key={project.title}>
										<p className={styles.description}>{line}</p>
									</div>
								))
							)}
						</div>
						<div className={styles['project-links-wrapper']}>
							<motion.a
								href={project.repository}
								target='_blank'
								rel='noreferrer'
								className={`btn btn-primary border-0 ${styles['github-link']}`}
								whileHover={{
									scale: 1.1,
								}}
								whileTap={{ scale: 0.9 }}
							>
								<FontAwesomeIcon
									icon={faGithub}
									className={styles['fa-github']}
								/>
								&nbsp; GitHub
							</motion.a>
							<motion.a
								href={project.url}
								target='_blank'
								rel='noreferrer'
								className={`btn btn-primary border-0 ${styles['live-demo-link']}`}
								whileHover={{
									scale: 1.1,
								}}
								whileTap={{ scale: 0.9 }}
							>
								Live Demo
							</motion.a>
						</div>
					</div>
				)}
			</div>
		</motion.main>
	)
}

export default ProjectDetail
