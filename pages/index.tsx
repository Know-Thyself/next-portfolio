import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import prisma from '../lib/prisma'
import { GetStaticProps } from 'next'
import { Heading, Text, FontWeight, FontStyle } from 'styled-typography'

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
			{/* <Home main={main} id={id} /> */}
			<header key={id} className={styles.header}>
				<div className={styles.banner}>
					{main.map((info, index) => {
						return (
							<div key={index} className={styles.headlines}>
								<div className={styles.name}>
									<Heading fontWeight={FontWeight.Normal} color='aliceblue'>
										{info.name}
									</Heading>
								</div>
								<div className={styles.field}>
									<Heading
										level={2}
										displayLevel={3}
										className={styles.subtitle}
										color='aliceblue'
										lineHeight={1.75}
										fontWeight={FontWeight.Normal}
										fontStyle={FontStyle.Normal}
									>
										{info.field}
									</Heading>
								</div>
								<div className={styles.introWrapper}>
									<Heading
										level={2}
										displayLevel={3}
										className={styles.intro}
										fontStyle={FontStyle.Normal}
										fontWeight={FontWeight.Normal}
										lineHeight={1.75}
									>
										{info.description}
									</Heading>
								</div>
							</div>
						)
					})}
				</div>
			</header>
		</>
	)
}

export default HomePage
