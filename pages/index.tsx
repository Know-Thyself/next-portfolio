import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import prisma from '../lib/prisma'
import { GetStaticProps } from 'next'
import Home from './home'

export async function getStaticProps() {
	const data = await prisma.portfolio.findMany()
	return {
		props: { data: data },
	}
}

const HomePage = ({ data }) => {
	const id = data.map((portfolio) => portfolio.id).pop()
	const main = data.map((portfolio) => portfolio.portfolioData.main)
	console.log(main)
	return (
		<>
			<Head>
				<title>Biruk Web Dev</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Home main={main} id={id} />
		</>
	)
}

export default HomePage
