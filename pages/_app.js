import { useState, useEffect } from 'react'
import Head from 'next/head'
import '../styles/globals.css'
import Layout from '../components/layout'
import Script from 'next/script'
import 'bootswatch/dist/slate/bootstrap.min.css'

function MyApp({ Component, pageProps }) {
  const [project, setProject] = useState({})
	return (
		<Layout>
			<Head>
				<title>Biruk | Full Stack Web Developer</title>
			</Head>
			<Script
				src='https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js'
				integrity='sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4'
				crossorigin='anonymous'
			/>
			<Component {...pageProps} project={project} setProject={setProject} />
		</Layout>
	)
}

export default MyApp
