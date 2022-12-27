import React, { useEffect } from 'react'
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
				<link
					rel='stylesheet'
					href='https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css'
				/>
				<link
					rel='stylesheet'
					href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css'
					integrity='sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=='
					crossOrigin='anonymous'
					referrerPolicy='no-referrer'
				/>
				<title>Biruk | Full Stack Web Developer</title>
			</Head>
			<Component {...pageProps} />
		</Layout>
	)
}

export default MyApp
