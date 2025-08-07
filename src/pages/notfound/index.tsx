

import styles from './NotFound.module.css';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>Tem mais acabou! A página não foi encontrada.</p>
      <Link to="/" className={styles.button}>Voltar para o início</Link>
    </div>
  );
}