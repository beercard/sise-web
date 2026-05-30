import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.group100}>
      <div className={styles.rectangle63}>
        <p className={styles.datosDeContacto}>Datos de contacto</p>
        <div className={styles.group97}>
          <p className={styles.nombre}>Nombre</p>
          <div className={styles.rectangle57}>
            <p className={styles.suNombreCompleto}>Su nombre completo</p>
          </div>
        </div>
        <div className={styles.group96}>
          <p className={styles.telFono}>Teléfono</p>
          <div className={styles.rectangle61}>
            <p className={styles.suNombreCompleto}>Su teléfono</p>
          </div>
        </div>
        <div className={styles.group96}>
          <p className={styles.telFono}>Email</p>
          <div className={styles.rectangle61}>
            <p className={styles.suNombreCompleto}>Su email</p>
          </div>
        </div>
        <div className={styles.autoWrapper}>
          <div className={styles.group85}>
            <img src="../image/mprihj3s-0qdgqi7.png" className={styles.vector} />
            <p className={styles.volver}>Volver</p>
          </div>
          <div className={styles.group98}>
            <p className={styles.enviar}>Enviar</p>
            <img src="../image/mprihj3s-nrn39si.png" className={styles.vector2} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Component;
