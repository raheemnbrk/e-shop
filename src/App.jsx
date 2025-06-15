import { useState , useEffect } from "react"

import NavBar from "./components/navBar"
import Content from "./components/content"
import Category from "./components/category";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
      <Content/>
      <Category/>
    </>
  )
}