import {useState, useEffect } from 'react'
import Head from 'next/head'
import '../styles/globals.css'
import Link from 'next/link'
import Layout from '../components/layout'

function MyApp({ Component, pageProps }) {
	return (
		<Layout>
			<Head>
				<title>Biruk | Full Stack Web Developer</title>
			</Head>
			<Component {...pageProps} />
		</Layout>
	)
}

export default MyApp
