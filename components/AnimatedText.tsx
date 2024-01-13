import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

type AnimatedTextProps = {
	text: string
	el?: keyof JSX.IntrinsicElements
	className?: string
}

const defaultAnimations = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0 },
}

const AnimatedText = ({
	text,
	el: Wrapper = 'p',
	className,
}: AnimatedTextProps) => {
	const ref = useRef(null)
	const isInView = useInView(ref, { amount: 0.5, once: true })

	return (
		<Wrapper className={className} key='animated-text'>
			<span className='sr-only'>{text}</span>
			<motion.span
				aria-hidden
				ref={ref}
				initial='hidden'
				animate={isInView ? 'visible' : 'hidden'}
				transition={{ staggerChildren: 0.15, delay: 2 }}
			>
				{text.split('').map((char, idx) => (
					<motion.span className='' variants={defaultAnimations} key={idx}>
						{char}
					</motion.span>
				))}
			</motion.span>
		</Wrapper>
	)
}

export default AnimatedText
