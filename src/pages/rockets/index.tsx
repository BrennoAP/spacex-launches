import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styles from "./rockets.module.css"

interface Rocket {
  name: string;
  description: string;
  company: string;
  first_flight: string;
  height: {
    meters: number;
  };
  diameter: {
    meters: number;
  };
  mass: {
    kg: number;
  };
}

export default function RocketDetails() {
  const { id } = useParams<{ id: string }>();
  const [rocket, setRocket] = useState<Rocket | null>(null);

  useEffect(() => {
    async function fetchRocket() {
      const res = await fetch('https://api.spacexdata.com/v4/rockets');
      const data: Rocket[] = await res.json();

      // Normaliza para comparar com ou sem maiúsculas
      const found = data.find(
        rocket => rocket.name.toLowerCase() === id?.toLowerCase()
      );

      setRocket(found || null);
    }

    fetchRocket();
  }, [id]);

  if (!rocket) return <p>Foguete não encontrado...</p>;

  return (
    <div>
<div className={styles.container}>
  <h1 className={styles.title}>{rocket.name}</h1>
  <p className={styles.detail}><strong>Descrição:</strong> {rocket.description}</p>
  <p className={styles.detail}><strong>Empresa:</strong> {rocket.company}</p>
  <p className={styles.detail}><strong>Primeiro voo:</strong> {rocket.first_flight}</p>
  <p className={styles.detail}><strong>Altura:</strong> {rocket.height.meters} m</p>
  <p className={styles.detail}><strong>Diâmetro:</strong> {rocket.diameter.meters} m</p>
  <p className={styles.detail}><strong>Massa:</strong> {rocket.mass.kg} kg</p>
  <Link to="/" className={styles.backLink}>← Voltar</Link>
</div>
    </div>
  );
}