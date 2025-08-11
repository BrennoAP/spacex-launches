import Home from "./pages/home"
import Mission from "./pages/mission"
import Rockets from "./pages/rockets"
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
                    path:"/mission/:id",
                    element:<Mission />
                },
                {
                    path:"/rockets/:id",
                    element:<Rockets />
                }
            ]
        },
        {
        path:"*",
        element:<NotFound/>
        }
    ],
     {
    basename: "/spacex-launches", 
     }
)

export {router}

