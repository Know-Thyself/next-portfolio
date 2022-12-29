import { useState, useEffect } from 'react'
import Head from 'next/head'
import '../styles/globals.css'
import Link from 'next/link'
import Layout from '../components/layout'

function MyApp({ Component, pageProps }) {
	const [project, setProject] = useState({})
	return (
		<Layout>
			<Head>
				<title>Biruk | Full Stack Web Developer</title>
				<style>
					@import
					url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Montserrat:wght@100;200;300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700;800;900&family=Poppins:wght@100;200;300;400;500;600&family=Source+Sans+Pro:wght@200;300;400;600;700&display=swap');
				</style>
			</Head>
			<Component {...pageProps} project={project} setProject={setProject} />
		</Layout>
	)
}

export default MyApp
