import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.group89}>
      <div className={styles.rectangle8}>
        <p className={styles.tipoDePropiedad}>Tipo de propiedad</p>
        <p className={styles.aDNdeQuerSInstalarLa}>
          ¿Dónde querés instalar la alarma?
        </p>
        <div className={styles.rectangle57}>
          <p className={styles.casa}>Casa</p>
        </div>
        <div className={styles.rectangle59}>
          <p className={styles.casa}>Comercio</p>
        </div>
        <div className={styles.rectangle58}>
          <p className={styles.departamento}>Departamento</p>
        </div>
        <div className={styles.rectangle60}>
          <p className={styles.oficina}>
            Oficina
            <br />
          </p>
        </div>
      </div>
    </div>
  );
}

export default Component;
