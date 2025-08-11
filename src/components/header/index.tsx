import styles from "./header.module.css"
import {Link} from "react-router-dom"
import imgLogo from "../../assets/spacex-lauches-logo.png"

export default function Header() {
    
    return(
        <>
         <header className={styles.container}>
            
             <Link className={styles.linkstyle} to="/">
                <img className={styles.banner} src={imgLogo} alt="logo da spaceX e um foquete com a terra ao fundo" />
            </Link>
           
        </header>
       </>
       
    )

}

//o header é basicamente uma imagem, testei 3 pra ver qual fica melhor, escolhi a que combina melhor com o fundo