import React from "react"
import Navbar from "../../components/Navbar/Navbar"
import styles from "./Login.module.css"
import LoginBox from "../../components/LoginBox/LoginBox"
import QuoteBox from "../../components/QuoteBox/QuoteBox"

const Login = () => {
	return (
		<div className={styles.login}>
			<div className={styles.overlay}>
				<Navbar />
				<div className={styles.loginContainer}>
					<LoginBox/>
					<QuoteBox/>
				</div>
			</div>
		</div>
	)
}

export default Login
