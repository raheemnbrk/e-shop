import NavBar from "./components/navBar"
import { useState , useEffect } from "react"

export default function App(){

  const [theme , setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
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
    </>
  )
}