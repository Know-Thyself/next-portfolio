//import ReadMoreLess from 'react-show-more-text'
import { useState } from 'react'
import { motion } from 'framer-motion'
import styles from '../styles/details.module.css'

const ProjectDetail = ({ project }) => {
	const [showMore, setShowMore] = useState(false)
	const descriptionLines = project.description.split(/\n/)
	const lessText = descriptionLines.join(' ').slice(0, 300)

	const toggleText = () => {
		setShowMore(!showMore)
	}

	return (
		<motion.main
			className={styles['main-container']}
			initial={{ opacity: 0.5 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0.5 }}
		>
			<div className={styles['project-wrapper']}>
				<h4 className={styles['project-title']}>{project.title}</h4>
				<img src={`/images/${project.image}`} alt='' />
				<div className={styles['read-more-read-less-wrapper']}>
					{descriptionLines.join(' ').length > lessText.length ? (
						<p className={styles.description}>
							{!showMore
								? lessText
								: descriptionLines.map((line) => (
										<p className={styles.description}>{line}</p>
								  ))}
							<span onClick={toggleText}>
								{!showMore ? '...read more ▼' : 'read less ▲'}
							</span>
						</p>
					) : (
						descriptionLines.map((line) => (
							<p className={styles.description}>{line}</p>
						))
					)}
				</div>
				<div className={styles['project-links-wrapper']}>
					<a
						href={project.repository}
						target='_blank'
						rel='noreferrer'
						className={styles['github-link']}
					>
						<i className='fa-brands fa-github'></i>&nbsp; GitHub
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
		</motion.main>
	)
}

export default ProjectDetail
