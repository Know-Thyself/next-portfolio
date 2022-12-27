import styles from '../styles/footer.module.css'
import { motion, AnimatePresence } from 'framer-motion'

const Footer = () => {
	return (
		<AnimatePresence exitBeforeEnter>
			<motion.div
				className={styles.footer}
				initial={{ y: 10, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				exit={{ y: -10, opacity: 0 }}
				transition={{ duration: 0.2 }}
			>
				footer
			</motion.div>
		</AnimatePresence>
	)
}

export default Footer
