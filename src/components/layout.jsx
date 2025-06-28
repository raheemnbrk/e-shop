import NavBar from "./navBar"
import { Outlet } from "react-router-dom"
import Footer from "./footer"

import { useEffect , useState } from "react"

export default function Layout(){
    const [theme , setTheme] = useState(
        localStorage.getItem("theme") || "light"
    )  

    const element = document.documentElement
    useEffect(()=>{
      localStorage.setItem("theme" , theme)
      if(theme === "dark"){
        element.classList.add("dark")
      }
      else{
        element.classList.remove("dark")
      }  
    },[theme])
    return(
        <>
          <NavBar theme={theme} setTheme={setTheme}/>
          <Outlet/>
          <Footer/>
        </>
    )
}