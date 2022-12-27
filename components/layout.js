//import Nav from './nav'
import Header from './header'

const Layout = ({ children, theme, setTheme }) => {
	return (
		<>
			<Header theme={theme} setTheme={setTheme} />
			{children}
		</>
	)
}

export default Layout
