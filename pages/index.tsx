import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import prisma from '../lib/prisma'
import { GetStaticProps } from 'next'
import Button from 'react-bootstrap/Button'
import Home from './home.js'

export const getStaticProps: GetStaticProps = async () => {
	const data = await prisma.portfolio.findMany()
	return { props: { data } }
}

const HomePage = ({ data }) => {
	const id = data.map((portfolio) => portfolio.id).pop()
	const main = data.map((portfolio) => portfolio.content)
	return (
		<>
			<Head>
				<title>Biruk Web Dev</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Home />
		</>
	)
}

export default HomePage
