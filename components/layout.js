//import Nav from './nav'
import Header from './header'

const Layout = ({ children }) => {
	return (
		<>
			<Header />
			{children}
		</>
	)
}

export default Layout
