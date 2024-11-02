/* eslint-disable no-unused-vars */
import React from 'react';
import styles from './Banner.module.css';
import Img from '../../assets/images/Art.png';

const Posters = () => {
  return (
    <div className={styles.bannerContainer}>
      <div className={styles.circle}></div>
      <img src={Img} className={styles.img} alt="Posters" />
      <h1 className={styles.welcome}>Welcome aboard, my friend</h1>
      <p className={styles.description}>Just a couple of clicks and we start</p>
    </div>
  );
};

export default Posters;
