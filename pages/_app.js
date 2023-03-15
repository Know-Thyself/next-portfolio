import { useState, useEffect } from 'react'
import Head from 'next/head'
import '../styles/globals.css'
import Layout from '../components/layout'

function MyApp({ Component, pageProps }) {
	const [project, setProject] = useState({})
	return (
		<Layout>
			<Head>
				<title>Biruk | Full Stack Web Developer</title>
			</Head>
			<Component {...pageProps} project={project} setProject={setProject} />
		</Layout>
	)
}

export default MyApp
