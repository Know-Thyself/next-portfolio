import Head from 'next/head'
import prisma from '../lib/prisma'
import { GetStaticProps } from 'next'
import { AnimatePresence } from 'framer-motion'
import Home from './home'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
import 'bootswatch/dist/slate/bootstrap.min.css'

export const getStaticProps: GetStaticProps = async () => {
	const data = await prisma.summary.findMany()
	return { props: { data } }
}

function HomePage({ data }): JSX.Element {
	return (
		<AnimatePresence>
			<Head>
				<title>Biruk | Full-Stack Developer</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Home data={data} />
		</AnimatePresence>
	)
}

export default HomePage
