import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.group102}>
      <div className={styles.rectangle63}>
        <div className={styles.group94}>
          <p className={styles.tipoDeContcto}>Tipo de contcto</p>
          <p className={styles.aCMoTeGustarAQueTeCo}>
            ¿Cómo te gustaría que te contacten?
          </p>
          <div className={styles.rectangle57}>
            <p className={styles.whatsApp}>WhatsApp</p>
          </div>
          <div className={styles.rectangle58}>
            <p className={styles.llamada}>Llamada</p>
          </div>
          <div className={styles.rectangle60}>
            <p className={styles.mail}>Mail</p>
          </div>
        </div>
        <div className={styles.group92}>
          <img src="../image/mprih780-fawjxwl.png" className={styles.vector} />
          <p className={styles.volver}>Volver</p>
        </div>
      </div>
    </div>
  );
}

export default Component;
