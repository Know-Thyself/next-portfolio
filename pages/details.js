import Head from 'next/head'
import { useState, ReactElement } from 'react'
import Link from 'next/link'
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
	let descriptionLines, lessText, url
	if (project.description) {
		let urlified = urlFinder(project.description)
		// if(urlified) {
		// 	console.log(urlified[0])
		// 	url = urlified[0]
		// }
			descriptionLines = urlified.split(/\n/)
			lessText = descriptionLines.join(' ').slice(0, 300)
	}
  console.log(descriptionLines)
	const toggleText = () => {
		setShowMore(!showMore)
	}
	function urlFinder(text) {
		let urlRegex = /(https?:\/\/[^\s]+)/g
		// return text.replace(urlRegex, function (url) {
		// 	return '<Link href="' + url + '">' + url + '</Link>'
		// })
		// or alternatively
		return text.replace(urlRegex, '<Link href="$1">$1</Link>')
	}
	function replaceURLs(message) {
		if (!message) return

		var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g
		return message.replace(urlRegex, function (url) {
			var hyperlink = url
			if (!hyperlink.match('^https?://')) {
				hyperlink = 'http://' + hyperlink
			}
			return (
				'<a href="' +
				hyperlink +
				'" target="_blank" rel="noopener noreferrer">' +
				url +
				'</a>'
			)
		})
	}

	function detectURLs(message) {
		var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g
		return message.match(urlRegex)
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
					<Link href='/projects' className={styles['back-btn']}>
						<FontAwesomeIcon className={styles['fa-left']} icon={faArrowLeft} />
						Back To Projects
					</Link>
				</div>
				{descriptionLines && (
					<div className={styles['project-wrapper']}>
						<h4 className={styles['project-title']}>{project.title}</h4>
						<img src={`/images/${project.image}`} alt='' />
						<div className={styles['read-more-read-less-wrapper']}>
							{descriptionLines.join(' ').length >= lessText.length ? (
								<div key='read-more'>
									{!showMore ? (
										<p className={styles.description}>
											<b style={{ fontWeight: 'bold' }}>
												{project.title}&nbsp;
											</b>
											{lessText.replace("''", "'")}
											{/* {lessText.replace(
												`${url}`,
												`<Link
													href={url}
													target='_blank'
													rel='noopener noreferrer'
													dangerouslySetInnerHTML={{ __html: url }}
												>
													<a>{url}</a>
												</Link>`
											)} */}
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
															{/* &nbsp; */}
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
								className={styles['github-link']}
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
								className={styles['live-demo-link']}
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
