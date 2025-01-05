import Navbar from "../../components/Navbar/Navbar"
import styles from "./Login.module.css"
import LoginBox from "../../components/LoginBox/LoginBox"
import QuoteBox from "../../components/QuoteBox/QuoteBox"
import Wrapper from "../../components/Wrapper/Wrapper"

const Login = () => {
	return (
		<div className={styles.login}>
			<div className={styles.overlay}>
				<Wrapper>
					<Navbar background="transparent"/>
				</Wrapper>
				<div className={styles.loginContainer}>
					<LoginBox/>
					<QuoteBox/>
				</div>
			</div>
		</div>
	)
}

export default Login
