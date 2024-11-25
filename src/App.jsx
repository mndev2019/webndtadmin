
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './Layout/Layout'
import Home from './Pages/Home'
import Services from './Pages/Services'
import Sector from './Pages/Sector'
import Sectordetails from './Pages/Sectordetails'
import Banner from './Pages/Banner'
import Clients from './Pages/Clients'
import Socail from './Pages/Socail'
import Contact from './Pages/Contact'
import Authlayout from './Authlayout'
import Login from './Authlayout/Login'

function App() {
  const ThemeRoutes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<Layout />}>

          <Route index element={<Banner />} />
          <Route path='/services' element={<Services />} />
          <Route path='/sector' element={<Sector />} />
          <Route path='/sector-details' element={<Sectordetails />} />
          <Route path='/banner' element={<Banner />} />
          <Route path='/client' element={<Clients />} />
          <Route path='/social' element={<Socail />} />
          <Route path='/contact' element={<Contact />} />

        </Route>
        {/* Routes that use the AuthLayout (no Header and Footer) */}
        <Route element={<Authlayout/>}>
          <Route path='login' element={<Login />} />
        </Route>
      </>
    )
  )

  return (
    <>
      <RouterProvider router={ThemeRoutes} />
    </>
  )
}

export default App
