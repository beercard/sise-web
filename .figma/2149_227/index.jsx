import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.group92}>
      <div className={styles.rectangle63}>
        <div className={styles.rectangle57}>
          <p className={styles.hasta60M}>Hasta 60 m²</p>
        </div>
        <div className={styles.rectangle58}>
          <p className={styles.entre60Y120M}>Entre 60 y 120 m²</p>
        </div>
        <div className={styles.rectangle60}>
          <p className={styles.mSDe120M}>Más de 120 m²</p>
        </div>
        <div className={styles.group93}>
          <img src="../image/mprigeql-ieml0ab.png" className={styles.vector} />
          <p className={styles.volver}>Volver</p>
        </div>
      </div>
      <p className={styles.tamaODelLugar}>Tamaño del lugar</p>
      <p className={styles.aQuTamaOTieneElEspac}>
        ¿Qué tamaño tiene el espacio a proteger?
      </p>
    </div>
  );
}

export default Component;
