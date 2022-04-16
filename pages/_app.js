import '../styles/globals.css'
import Link from 'next/link'
import Layout from './layout'

function MyApp({ Component, pageProps }) {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	)
}

export default MyApp
