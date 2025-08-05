import { BsSearch } from "react-icons/bs"
import style from "./home.module.css"

export default function Home() {
    
    return(
        <main className={style.container}>
            <form className={style.form}>
                <input type="text" placeholder="digite o nome de um foguete ou missão" />
                <button>
                    <BsSearch size={30} color="#fff" />
                </button>
            </form>
        </main>
    )

}