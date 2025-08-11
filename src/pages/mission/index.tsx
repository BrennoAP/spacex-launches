import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import styles from "./mission.module.css"


//pensei tambem em usar uma interface
type Launch = {
  name: string
  details: string | null
  date_utc: string
  success: boolean | null
  flight_number: number
  rocket: string
  launchpad: string
  links: {
    patch: {
      small: string | null
    }
    webcast: string | null
  }
}

type RouteParams = {
  id: string
}

export default function Mission() {
  const { id } = useParams<RouteParams>()
  const [mission, setMission] = useState<Launch | null>(null)

  useEffect(() => {
    async function fetchMission() {
      try {
        const res = await fetch(`https://api.spacexdata.com/v4/launches/${id}`)
        const data = await res.json()
        setMission(data)
      } catch (error) {
        console.error("Erro ao buscar missão:", error)
      }
    }

    if (id) fetchMission()
  }, [id])

  if (!mission) return <p>Tentando localizar...</p>

  return (
    <div className={styles.container}>
      <h1>{mission.name}</h1>

      {mission.links.patch.small && (
        <img src={mission.links.patch.small} alt={`Logo da missão ${mission.name}`} /> // a api retorna uma url com a imagem que vive fora do ar
      )}

      <p><strong>Detalhes:</strong> {mission.details || "Sem detalhes disponíveis."}</p>
      <p><strong>Data:</strong> {new Date(mission.date_utc).toLocaleDateString()}</p>
      <p><strong>Número do voo:</strong> {mission.flight_number}</p>
      <p><strong>Sucesso:</strong> {mission.success === null ? "Desconhecido" : mission.success ? "Sim" : "Não"}</p>
      {mission.links.webcast && (
        <p>
          <a href={mission.links.webcast} target="_blank" rel="noreferrer">
            Assista ao lançamento
          </a>
        </p>
      )}
      <Link className={styles.backLink} to="/">← Voltar</Link>
    </div>
  )
}
