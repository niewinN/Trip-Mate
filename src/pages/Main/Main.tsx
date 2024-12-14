// import MainQuote from "../../components/MainQuote/MainQuote"
// import MainSearchPanel from "../../components/MainSearchPanel/MainSearchPanel"
// import Navbar from "../../components/Navbar/Navbar"
// import VerticalNav from "../../components/VerticalNav/VerticalNav"
// import WeatherBox from "../../components/WeatherBox/WeatherBox"
// import Wrapper from "../../components/Wrapper/Wrapper"
// import styles from "./Main.module.css"

// const Main: React.FC = () => {
// 	return (
// 		<div className={styles.main}>
// 			<div className={styles.overlay}>
// 				<Wrapper>
// 					<Navbar background="transparent"/>
// 					<div className={styles.flex}>
// 						<div className={styles.left}>
// 							<MainQuote/>
// 							<MainSearchPanel />
// 							<WeatherBox />
// 						</div>
// 						<VerticalNav/>
// 					</div>
// 				</Wrapper>
// 			</div>
// 		</div>
// 	)
// }

// export default Main
import MainQuote from "../../components/MainQuote/MainQuote";
import MainSearchPanel from "../../components/MainSearchPanel/MainSearchPanel";
import Navbar from "../../components/Navbar/Navbar";
import VerticalNav from "../../components/VerticalNav/VerticalNav";
import WeatherBox from "../../components/WeatherBox/WeatherBox";
import Wrapper from "../../components/Wrapper/Wrapper";
import styles from "./Main.module.css";

const Main: React.FC = () => {
  return (
    <div className={styles.main}>
      <div className={styles.overlay}>
        <Wrapper>
          <Navbar background="transparent" showNavLinks={false} />
          <div className={styles.flex}>
            <div className={styles.left}>
              <MainQuote />
              <MainSearchPanel />
              <WeatherBox />
            </div>
            <VerticalNav />
          </div>
        </Wrapper>
      </div>
    </div>
  );
};

export default Main;
