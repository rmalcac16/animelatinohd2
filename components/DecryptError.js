import React from 'react';
import styles from '../styles/DecryptError.module.css';
import Layout from './Layout';
import error from '../assets/images/error.png';
import Image from 'next/image';

const DecryptError = () => (
    <Layout>
        <div className={styles.errorContainer}>
            <div>
                <h1 className={styles.errorTitle}>Error</h1>
                <p className={styles.errorMessage}>¡Oh no! Algo salió mal.</p>
                <p className={styles.errorMessage}>
                    No se ha podido desencriptar el contenido.
                </p>
                <p className={styles.errorMessage}>
                    Por favor, inténtalo de nuevo más tarde.
                </p>
            </div>
        </div>
    </Layout>
);

export default DecryptError;
