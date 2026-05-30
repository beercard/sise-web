import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.group91}>
      <div className={styles.rectangle63}>
        <div className={styles.rectangle57}>
          <p className={styles.sRecientemente}>Sí, recientemente</p>
        </div>
        <div className={styles.rectangle58}>
          <p className={styles.sHaceTiempo}>Sí, hace tiempo</p>
        </div>
        <div className={styles.rectangle60}>
          <p className={styles.no}>No</p>
        </div>
        <div className={styles.group92}>
          <img src="../image/mprig89g-w7hvqoq.png" className={styles.vector} />
          <p className={styles.volver}>Volver</p>
        </div>
      </div>
      <p className={styles.nivelDeRiesgo}>Nivel de riesgo</p>
      <p className={styles.aTuvisteAlgNIntentoD}>
        ¿Tuviste algún intento de robo o intrusión?
      </p>
    </div>
  );
}

export default Component;
