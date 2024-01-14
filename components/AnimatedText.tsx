import { useRef } from 'react'
import { motion, spring, useInView } from 'framer-motion'

type AnimatedTextProps = {
	text?: string
	longText?: string
	el?: keyof JSX.IntrinsicElements
	className?: string
	once?: boolean
}

const defaultAnimations = {
	hidden: { opacity: 0, x: 200 },
	visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
}

const AnimatedText = ({
	text,
	longText,
	el: Wrapper = 'p',
	className,
	once,
}: AnimatedTextProps) => {
	const ref = useRef(null)
	const isInView = useInView(ref, { amount: 0.5, once })

	return (
		<Wrapper className={className} key='animated-text'>
			<span className='sr-only'>{text}</span>
			<motion.span
				aria-hidden
				ref={ref}
				initial='hidden'
				animate={isInView ? 'visible' : 'hidden'}
				transition={{ staggerChildren: 0.15, delayChildren: 0.5 }}
				// style={{ display: 'flex', flexWrap: 'wrap' }}
			>
				{!longText
					? text.split('').map((char, idx) => (
							<motion.span
								className='d-inline-block'
								variants={defaultAnimations}
								key={idx}
							>
								{char === ' ' ? '\u00a0' : char}
							</motion.span>
					  ))
					: longText.split(' ').map((word, idx) => (
							<motion.span
								className='d-inline-block mr-4'
								variants={defaultAnimations}
								key={idx}
								style={{ marginRight: '5px' }}
								// className={styles.intro}
							>
								{word}
							</motion.span>
					  ))}
			</motion.span>
		</Wrapper>
	)
}

export default AnimatedText
