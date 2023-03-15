import Head from 'next/head'
import prisma from '../lib/prisma'
import { GetStaticProps } from 'next'
import Home from './home.tsx'

export const getStaticProps: GetStaticProps = async () => {
	const data = await prisma.portfolio.findMany()
	return { props: { data } }
}

const HomePage = ({ data }) => {
	const id = data.map((portfolio) => portfolio.id).pop()
	const about = data.map((portfolio) => portfolio.content.about)
	return (
		<>
			<Head>
				<title>Biruk | Full Stack Web Developer</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Home about={about} />
		</>
	)
}

export default HomePage
