import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.group90}>
      <div className={styles.group101}>
        <div className={styles.rectangle63}>
          <div className={styles.rectangle57}>
            <p className={styles.sActualmenteTengo}>Sí, actualmente tengo</p>
          </div>
          <div className={styles.rectangle58}>
            <p className={styles.sTuveAntes}>Sí, tuve antes</p>
          </div>
          <div className={styles.rectangle60}>
            <p className={styles.noSerALaPrimeraVez}>No, sería la primera vez</p>
          </div>
          <div className={styles.group85}>
            <img src="../image/mprifxbx-y0mieuj.png" className={styles.vector} />
            <p className={styles.volver}>Volver</p>
          </div>
        </div>
        <p className={styles.experienciaPrevia}>Experiencia previa</p>
        <p className={styles.aYaTenSoTuvisteAlarm}>¿Ya tenés o tuviste alarma?</p>
      </div>
    </div>
  );
}

export default Component;
