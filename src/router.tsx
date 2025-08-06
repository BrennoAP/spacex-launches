import Home from "./pages/home"
import Details from "./pages/details"
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
                    path:"/details/:rocket",
                    element:<Details/>
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

