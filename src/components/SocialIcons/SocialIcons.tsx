import React from 'react';
import styles from './SocialIcons.module.css';
import facebook from "../../assets/socialmedia/facebook.png"
import instagram from "../../assets/socialmedia/instagram.png"
import google from "../../assets/socialmedia/google.png"
import twitter from "../../assets/socialmedia/twitter.png"

const SocialIcons: React.FC = () => {
  return (
    <div className={styles.icons}>
      <a href="#" className={styles.icon}>
        <img src={facebook} alt="Facebook" />
      </a>
      <a href="#" className={styles.icon}>
        <img src={instagram} alt="Instagram" />
      </a>
      <a href="#" className={styles.icon}>
        <img src={google} alt="Google" />
      </a>
      <a href="#" className={styles.icon}>
        <img src={twitter} alt="Twitter" />
      </a>
    </div>
  );
};

export default SocialIcons;
