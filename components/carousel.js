'use client'
import React from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

import Image from 'next/image'
import technologies from '../technologies.json'

const MultiCarousel = ({ images }) => {
	const responsive = {
		desktop: {
			breakpoint: { max: 3000, min: 1324 },
			items: 5,
			slidesToSlide: 4,
		},
		laptop: {
			breakpoint: { max: 1323, min: 1068 },
			items: 3,
			slidesToSlide: 2,
		},
		tablet: {
			breakpoint: { max: 1067, min: 545 },
			items: 2,
			slidesToSlide: 1,
		},
		mobile: {
			breakpoint: { max: 544, min: 300 },
			items: 1,
			slidesToSlide: 1, // optional, default to 1.
		},
	}

	return (
		<div className='parent'>
			<Carousel
				responsive={responsive}
				autoPlay={true}
				swipeable={true}
				draggable={true}
				showDots={true}
				infinite={true}
				partialVisible={false}
				dotListClass={'custom-dot-list-style'}
				containerClass={'carousel-container'}
			>
				{technologies.map((image, index) => {
					return (
						<div className={'slider'} key={index}>
							<Image
								key={index}
								src={image.src}
								alt={image.label}
								loading='eager'
								// className={styles['project-img']}
								width={180}
								height={140}
								sizes='(min-width: 300px) 100vw'
								placeholder='blur'
								blurDataURL={image.src}
							/>
						</div>
					)
				})}
			</Carousel>
		</div>
	)
}
export default MultiCarousel
