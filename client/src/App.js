import React from 'react'
import Home from './Components/Home/Home'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import {Slide, ToastContainer} from "react-toastify";
import SideBar from "./Components/admin/SideBar/SideBar";
import Hotel from "./Components/admin/Pages/Hotel/Hotel";
import CreateHotel from "./Components/admin/Pages/CreateHotel/CreateHotel";
import './App.css'
import Auth from "./Components/Auth/Auth";
import EditHotel from "./Components/admin/Pages/EditHotel/EditHotel";
import Booking from "./Components/admin/Pages/Booking/Booking";
import NotFound from "./Components/NotFound/NotFound";
import Header from './Components/Header/Header'

const App = () => {

  return (
      <div>
          <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              transition={Slide}
              pauseOnFocusLoss
              draggable
              pauseOnHover
          />
          <Router>
              <Routes>
                  <Route path={'/:id'} element={
                      <React.Fragment>
                          <Header/>
                          <Home/>
                          <Footer />
                      </React.Fragment>
                  } />
                  <Route path={'/admin/hotel'} element={
                      <React.Fragment>
                          <SideBar />
                          <Hotel />
                      </React.Fragment>
                  } />
                  <Route path={'/admin/create/hotel'} element={
                      <React.Fragment>
                          <SideBar />
                          <CreateHotel />
                      </React.Fragment>
                  } />
                  <Route path={'/admin/edit/hotel/:id'} element={
                      <React.Fragment>
                          <SideBar />
                          <EditHotel />
                      </React.Fragment>
                  } />

                  <Route path={'/admin/booking'} element={
                      <React.Fragment>
                          <SideBar />
                          <Booking />
                      </React.Fragment>
                  } />
                  <Route path={'/admin/auth'} element={<Auth/>}/>
                  <Route path={'*'} element={<NotFound />}/>
              </Routes>



          </Router>
      </div>

  )
}

export default App
