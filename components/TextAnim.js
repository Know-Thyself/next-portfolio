import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect } from 'react'
import CursorBlinker from './cursor'

export default function TextAnim({ text }) {
	const count = useMotionValue(0)
	const baseText = text
	const rounded = useTransform(count, latest => Math.round(latest))
	const displayText = useTransform(rounded, latest => baseText.slice(0, latest))

	useEffect(() => {
		const controls = animate(count, baseText.length, {
			type: 'tween',
			duration: 1,
			ease: 'easeInOut',
		})
		return controls.stop
	}, [count, baseText.length])

	return (
		<span className=''>
			<motion.span>{displayText}</motion.span>
			<CursorBlinker />
		</span>
	)
}
