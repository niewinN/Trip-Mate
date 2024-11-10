import styles from "./NavProfile.module.css"
import profileLogo from "../../assets/main/profile-logo.png"
import { useNavigate } from "react-router-dom"

const NavProfile: React.FC = () => {
	const navigate = useNavigate()

	const handleClick = () => {
		navigate("/login")
	}

	return (
		<div className={styles.logo} onClick={handleClick}>
			<img src={profileLogo} alt='Konto' />
		</div>
	)
}

export default NavProfile
