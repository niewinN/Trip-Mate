import Navbar from "../../components/Navbar/Navbar"
import PlanAxis from "../../components/PlanAxis/PlanAxis"
import Wrapper from "../../components/Wrapper/Wrapper"
import styles from "./Plan.module.css"

const Plan = () => {
  return (
    <div className={styles.plan}>
        <Navbar background="#007bff"/>
        <Wrapper>
            <PlanAxis/>
        </Wrapper>
    </div>
  )
}

export default Plan