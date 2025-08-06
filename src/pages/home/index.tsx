import { BsSearch } from "react-icons/bs"
import style from "./home.module.css"
import {Link, useNavigate}  from "react-router-dom"
import { useState ,type FormEvent} from "react"


export default function Home() {
    
    const [textInput, setTextInput] = useState("")
    const navigate = useNavigate()

    const handleMoreItens = ()=>{
        alert("AHHHHHHHHH")
    }
    
    const handleSubmit = (e:FormEvent) => {

        e.preventDefault()
        if(textInput ==='') return

        navigate(`/details/${textInput}`)

    }



    return(
        <>
        <main className={style.container}>
            <form className={style.form}   onSubmit={handleSubmit}>
                <input type="text" placeholder="digite o nome de um foguete ou missão" 
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
                        <th scope="col">Data</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>

                <tbody id="tbody">
                    <tr className={style.tr}>
                        <td className={style.tdlabel} data-label="Missao">
                            <div className={style.name}>
                                <Link to="/details">
                                    <span>Missao da spacex</span>
                                </Link>
                            </div>
                            
                        </td>
                        <td className={style.tdlabel} data-label="foguete">
                            Foguete
                        </td>
                        <td className={style.tdlabel} data-label="data">
                            01/02/2025
                        </td>
                        <td className={style.tdSucces} data-label="status">
                            Sucesso
                        </td>
                    </tr>
                </tbody>

            </table>
            <div className={style.btnContainer}>
            <button className={style.btnMais} onClick={handleMoreItens}>
                carregar mais
            </button>
            </div>

</>

        
    )

}