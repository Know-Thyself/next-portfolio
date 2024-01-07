import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'
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
import styles from '../styles/footer.module.css'

const Footer = () => {
	const control = useAnimation()
	const [ref, inView] = useInView()
	const scrollVariant = {
		visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
		hidden: { opacity: 0, scale: 0 },
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
			<motion.div
				className={styles.footer}
				// initial={{ y: 10, opacity: 0 }}
				// animate={{ y: 0, opacity: 1 }}
				// exit={{ y: -10, opacity: 0 }}
				// transition={{ duration: 0.2 }}
				ref={ref}
				variants={scrollVariant}
				initial='hidden'
				// animate={control}
				whileInView='visible'
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
					<p>
						<FontAwesomeIcon
							icon={faPhoneVolume}
							className={styles['fa-phone-volume']}
						/>
						&nbsp; +44&nbsp; 7392&nbsp; 976062
					</p>
					<p>
						<FontAwesomeIcon icon={faEnvelope} /> &nbsp; birukwebdev@gmail.com
					</p>
					<p>
						<FontAwesomeIcon icon={faMapLocationDot} /> &nbsp; 63 Sandy
						Lane,&nbsp; CV1 4EX,&nbsp; West Midlands,&nbsp; Coventry,&nbsp; UK
					</p>
				</section>
			</motion.div>
		</AnimatePresence>
	)
}

export default Footer
