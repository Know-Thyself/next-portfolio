import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import prisma from '../lib/prisma'
import { GetStaticProps } from 'next'
import { Heading, Text, FontWeight, FontStyle } from 'styled-typography'
import Button from 'react-bootstrap/Button'

export const getStaticProps: GetStaticProps = async () => {
	const data = await prisma.portfolio.findMany()
	return { props: { data } }
}

const HomePage = ({ data }) => {
	const id = data.map((portfolio) => portfolio.id).pop()
	const main = data.map((portfolio) => portfolio.portfolioData.main)
	return (
		<>
			<Head>
				<title>Biruk Web Dev</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main className={styles.hero}>
				{main.map((info, index) => {
					return (
						<section key={index} className={styles.textWrapper}>
							<Heading
								className={styles.banner}
								fontWeight={FontWeight.Normal}
								color='aliceblue'
							>
								Great ideas worth sharing!
							</Heading>
							<Heading
								level={2}
								displayLevel={3}
								className={styles.intro}
								color='aliceblue'
								lineHeight={1.75}
								fontWeight={FontWeight.Normal}
								fontStyle={FontStyle.Normal}
							>
								Hello and Welcome to my portfolio + website which I built to
								showcase some of my projects as well as to create an online
								platform for sharing ideas that are worth spreading. My name is
								Biruk Kebede and I am a Full Stack Developer. Software
								Engineering is my newly discovered passion with which I have
								been exploring exciting digital horizons since I started coding
								in 2019 when I joined CodeYourFuture, a great coding bootcamp I
								am still a part of.
							</Heading>
							<Button className={styles.more}>Learn more</Button>
						</section>
					)
				})}
			</main>
		</>
	)
}

export default HomePage
