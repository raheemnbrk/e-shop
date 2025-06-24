import { RouterProvider , createBrowserRouter , createRoutesFromElements , Route } from "react-router-dom"

import Layout from "./components/layout"
import Home from "./pages/home"

export default function App(){
  const router = createBrowserRouter(createRoutesFromElements(
    <Route element={<Layout/>} >
      <Route index element={<Home/>}/>
    </Route>
  ))
  return(
    <>
     <RouterProvider router={router} /> 
    </>
  )
}