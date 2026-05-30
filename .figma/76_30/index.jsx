import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <p className={styles.solucionesEnSegurida3}>
      <span className={styles.solucionesEnSegurida}>
        Soluciones en seguridad electrónica&nbsp;
      </span>
      <span className={styles.solucionesEnSegurida2}>
        accesible, moderna y humana
      </span>
      <span className={styles.solucionesEnSegurida}>.</span>
    </p>
  );
}

export default Component;
