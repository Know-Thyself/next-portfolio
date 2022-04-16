import { Heading, Text, FontWeight, FontStyle } from 'styled-typography'
import styles from '../styles/Home.module.css'
const Home = ({ main, id }) => {
	console.log(main)
	return (
		<header key={id} className={styles.header}>
			<div className={styles.banner}>
				{main.map((info) => {
					return (
						<div className={styles.headlines}>
							<div className={styles.name}>
								<Heading fontWeight={FontWeight.Normal} color='aliceblue'>
									{info.name}
								</Heading>
							</div>
							<div className={styles.field}>
								<Heading
									level={2}
									displayLevel={3}
									className={styles.subtitle}
									color='aliceblue'
									lineHeight={1.75}
									fontWeight={FontWeight.Normal}
									fontStyle={FontStyle.Normal}
								>
									{info.field}
								</Heading>
							</div>
							<div className={styles.introWrapper}>
								<Heading
									level={2}
									displayLevel={3}
									className={styles.intro}
									fontStyle={FontStyle.Normal}
									fontWeight={FontWeight.Normal}
									lineHeight={1.75}
								>
									{info.description}
								</Heading>
							</div>
						</div>
					)
				})}
			</div>
		</header>
	)
}

export default Home
