import Header from "../header"
import {Outlet} from "react-router-dom"

export default function Layout() {
    
    return(
        <>
        <Header/>
        <Outlet />
        </>
    )

}

//usando o outlet para manter o header em todas as paginas, com exeção da notfound