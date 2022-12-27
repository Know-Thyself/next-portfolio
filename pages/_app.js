import {useState, useEffect } from 'react'
// import useLocalStorage from 'use-local-storage'
//import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/globals.css'
import Link from 'next/link'
import Layout from '../components/layout'
// import styled from '@emotion/styled'
// import ThemeToggle from '../components/themes'

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
