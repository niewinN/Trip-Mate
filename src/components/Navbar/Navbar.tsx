import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import NavLogo from "../NavLogo/NavLogo"
import NavProfile from "../NavProfile/NavProfile"
import Wrapper from "../Wrapper/Wrapper";
import styles from "./Navbar.module.css"

interface NavbarProps {
	background?: "#007bff" | "transparent"; // Allow only "blue" or "transparent"
  }

const Navbar: React.FC<NavbarProps> = ({background = "blue"}) => {
	return (
		<div className={styles.fullWidth}
		style={{ "--background-color": background } as React.CSSProperties}>
			<Wrapper>
				<div
				className={styles.navbar}
			>
					<NavLogo />
					<div className={styles.right}>
						<NavProfile />
						<HamburgerMenu/>
					</div>
				</div>
			</Wrapper>
		</div>
	)
}

export default Navbar
