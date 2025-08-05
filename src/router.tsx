import Home from "./pages/home"
import Detail from "./pages/details"
import NotFound from "./pages/notfound"
import {createBrowserRouter} from "react-router-dom"
import Layout from "./components/layout"



const router = createBrowserRouter(

    [
        {
            element:<Layout />,
            children:[
                {
                    path:"/",
                    element:<Home />
                },
                {
                    path:"/details",
                    element:<Detail/>
                }
            ]
        },
        {
        path:"*",
        element:<NotFound/>
        }
    ]
)

export {router}

