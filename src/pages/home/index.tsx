import { BsSearch } from "react-icons/bs"
import style from "./home.module.css"
import {Link, useNavigate}  from "react-router-dom"
import { useState ,useEffect,type FormEvent, useMemo} from "react"


export default function Home() {
    
    const [textInput, setTextInput] = useState("")
    const navigate = useNavigate()



    //Eu poderia usar react query pra trabalhar com essa api e sei que seria uma pratica melhor, 
    // mas acho que pra esse projeto seria uma exagerado, tipo usar uma bazuca pra matar uma mosca


 type Launch = {
  id: string;
  name: string;
  rocket: string; // ID do foguete
  date_utc: string;
  success: boolean | null;
};

type Rocket = {
  id: string;
  name: string;
};

  const [launches, setLaunches] = useState<Launch[]>([]);
  const [rockets, setRockets] = useState<Record<string, string>>({});
  const [launchesList,setLaunchesList] = useState(10)
  const [sortData,setSortData] = useState<'asc'| 'des'>('asc')

  useEffect(() => { //optei por não usar axios pois não achei necessário 
    async function fetchData() {
  try {
        const [launchesRes, rocketsRes] = await Promise.all([
          fetch('https://api.spacexdata.com/v5/launches'),
          fetch('https://api.spacexdata.com/v4/rockets'),
        ]);
  

      const launchesData: Launch[] = await launchesRes.json();
      const rocketsData: Rocket[] = await rocketsRes.json();

      const rocketMap: Record<string, string> = rocketsData.reduce((acc, rocket) => {
        acc[rocket.id] = rocket.name;
        return acc;
      }, {} as Record<string, string>);

      launchesData.sort(
        (a, b) => new Date(b.date_utc).getTime() - new Date(a.date_utc).getTime()
      );

      setLaunches(launchesData);
      setRockets(rocketMap);
  } catch (error) {
    alert("erro ao carregar a pagina, tente novamente")
    //eu poderia tratar o erro beeeem melhor, mas e só um projeto de aprendizado
  }
    }

    fetchData();
  }, []);

  //fazendo sort da lista por data

  const sortedLaunches = useMemo(() => [...launches].sort(
    (a,b)=> {
        const dataAsc = new Date(a.date_utc).getTime()
        const dataDes = new Date(b.date_utc).getTime()
        return sortData === "asc"? dataAsc -dataDes: dataDes - dataAsc
    }
  ),[launches,sortData])

const handleSort = () => setSortData((prevOrder) => (prevOrder === 'asc' ? 'des' : 'asc'));




  //listando os launches para paginação com botão
  const launchesPagination = () => sortedLaunches.slice(0,launchesList)
    
  
    
    const handleSubmit = (e:FormEvent) => {

        e.preventDefault()
        if(textInput ==='') return   //apenas não faz nada se não tiver algo no campo de texto

        navigate(`/rockets/${textInput}`)

    }



    return(
        <>
        <main className={style.container}>
            <form className={style.form}   onSubmit={handleSubmit}>
                <input type="text" placeholder="digite o nome de um foguete e clique na lupa para mais informações" 
                value={textInput}   
                onChange={(e)=> setTextInput(e.target.value)}/> 
                <button type="submit">
                    <BsSearch size={30} color="#fff" />
                </button>
            </form>
        </main>
            <table className={style.tcontainer}>
                <thead>
                    <tr>
                        <th scope="col">Missão</th>
                        <th scope="col">Foguete</th>
                        <th scope="col" className={style.btnOrder} onClick={handleSort}>Data {sortData === 'asc' ? '↑' : '↓'}</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
            <tbody id="tbody">
            { launchesPagination().map((launch) => (    
                    <tr className={style.tr} key={launch.id}>
                        <td className={style.tdlabel} data-label="Missao">
                            <div className={style.name}>
                                <Link to={`/mission/${launch.id}`}>
                                    <span>{launch.name}</span>
                                </Link>
                            </div>
                            
                        </td>
                        <td className={style.tdlabel} data-label="foguete">
                            {rockets[launch.rocket] || 'Desconhecido'}
                        </td>
                        <td className={style.tdlabel} data-label="data">
                            {new Date(launch.date_utc).toLocaleString('pt-BR', { timeZone: 'UTC' })}
                        </td>
                        <td className={launch.success === true ?style.tdSucces:style.tdFailure} data-label="status">
                            {launch.success === true ? 'Sucesso' :
                            launch.success === false ? 'Falha' :
                            'desconhecido'}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <div className={style.btnContainer}>
            <button className={style.btnMais} onClick={
                () => setLaunchesList( launchesList + 10)}> 
                carregar mais
            </button>
            </div>

</>
 //eu poderia usar useRef ou Debouce no onChange, se fosse uma aplicação mais complexa...
 //a paginação carrega mais 10 entradas,não existem muitos lançamentos, cerca de 200
    )

}