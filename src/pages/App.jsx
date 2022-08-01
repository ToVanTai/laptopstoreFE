import React from 'react'
import {Outlet} from "react-router-dom"
import Container from "../components/Container"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import Overlay from '../components/Overlay'
import Sidebar from "../components/Sidebar"
import "../css/pages/home/home.css"
const App = () => {
  return (
    <div>
        <Sidebar/>
        <Navbar/>
        <Overlay/>
        <Container>
            <Outlet/>
            <Footer/>
        </Container>
    </div>
  )
}

export default App