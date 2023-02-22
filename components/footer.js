import styles from '../styles/footer.module.css'
import { motion, AnimatePresence } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faPhoneVolume,
	faEnvelope,
	faMapLocationDot,
} from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faCopyright } from '@fortawesome/free-solid-svg-icons'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

const Footer = () => {
	return (
		<AnimatePresence>
			<motion.div
				className={styles.footer}
				initial={{ y: 10, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				exit={{ y: -10, opacity: 0 }}
				transition={{ duration: 0.2 }}
			>
				<div className={styles.anchors}>
					<p>
						<FontAwesomeIcon icon={faCopyright} className={styles.copyright} />{' '}
						Biruk Kebede 2023
					</p>
					<a
						href='https://github.com/Know-Thyself'
						target='_blank'
						rel='noreferrer'
						className={styles.link}
					>
						<FontAwesomeIcon icon={faGithub} className={styles['fa-brand']} />
					</a>
					<a
						href='https://www.linkedin.com/in/biruk-kebede-8b44b7209/'
						target='_blank'
						rel='noreferrer'
						className={styles.link}
					>
						<FontAwesomeIcon icon={faLinkedin} className={styles['fa-brand']} />
					</a>
				</div>
				<section className={styles['contact-info']}>
					{/* <h3>Contact Info</h3> */}
					<p>
						<FontAwesomeIcon
							icon={faPhoneVolume}
							className={styles['fa-phone-volume']}
						/>
						&nbsp; +44 7392 976062
					</p>
					<p>
						<FontAwesomeIcon icon={faEnvelope} /> &nbsp; birukwebdev@gmail.com
					</p>
					<p>
						<FontAwesomeIcon icon={faMapLocationDot} /> &nbsp; 63 Sandy Lane,
						CV1 4EX, West Midlands, Coventry, UK
					</p>
				</section>
			</motion.div>
		</AnimatePresence>
	)
}

export default Footer
