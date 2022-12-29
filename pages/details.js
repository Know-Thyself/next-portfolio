//import ReadMoreLess from 'react-show-more-text'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
			{descriptionLines && (
				<div className={styles['project-wrapper']}>
					<h4 className={styles['project-title']}>{project.title}</h4>
					<img src={`/images/${project.image}`} alt='' />
					<div className={styles['read-more-read-less-wrapper']}>
						{descriptionLines.join(' ').length >= lessText.length ? (
							<div key='read-more' className={styles.description}>
								{!showMore ? (
									<p>
										{lessText}
										<span key='span' onClick={toggleText}>
											{!showMore ? '...read more ▼' : 'read less ▲'}
										</span>
									</p>
								) : (
									descriptionLines.map((line, idx) => (
										<div key={idx} className={styles.description}>
											<p>
												{line}
												{idx === descriptionLines.length - 1 && (
													<span key='span' onClick={toggleText}>
														&nbsp;{!showMore ? '...read more ▼' : 'read less ▲'}
													</span>
												)}
											</p>
										</div>
									))
								)}
							</div>
						) : (
							descriptionLines.map((line, idx) => (
								<div key={idx}>
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
							className={styles['github-link']}
							whileHover={{
								scale: 1.1,
								backgroundColor: 'var(--button-hover-bg)',
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
							className={styles['live-demo-link']}
							whileHover={{
								scale: 1.1,
								backgroundColor: 'var(--button-hover-bg)',
							}}
							whileTap={{ scale: 0.9 }}
						>
							Live Demo
						</motion.a>
					</div>
				</div>
			)}
		</motion.main>
	)
}

export default ProjectDetail
