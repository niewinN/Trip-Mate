import MainQuote from "../../components/MainQuote/MainQuote"
import MainSearchPanel from "../../components/MainSearchPanel/MainSearchPanel"
import Navbar from "../../components/Navbar/Navbar"
import WeatherBox from "../../components/WeatherBox/WeatherBox"
import Wrapper from "../../components/Wrapper/Wrapper"
import styles from "./Main.module.css"

const Main: React.FC = () => {
	return (
		<div className={styles.main}>
			<div className={styles.overlay}>
				<Wrapper>
					<Navbar />
					<div className={styles.left}>
						<MainQuote/>
						<MainSearchPanel />
						<WeatherBox />
					</div>
				</Wrapper>
			</div>
		</div>
	)
}

export default Main
