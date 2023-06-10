import { useState } from 'react'
import './App.css'
import Login from './pages/Login/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './pages/Register/Register'
import Navbar from './Components/Navbar/Navbar'
import Header from './Components/Header/Header'
import FiltersCard from './Components/FiltersCard/FiltersCard'
import Feedbacks from './pages/Feedbacks/Feedbacks'
import AddProductForm from './Components/AddProductForm/AddProductForm'

function App() {
  const [login, setLogin] = useState(false)

  function loginUpdate() {
    if(login) {
      setLogin(false)
    } else {
      setLogin(true)
    }
  }

  const handleData = (childData) => {
    if(childData === true) {
      setLogin(false)
    } else {
      setLogin(true)
    }
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<Feedbacks />} />

          <Route path='/nav' element={<Navbar login={login} loginUpdate={loginUpdate} sendData={handleData} />} />
          <Route path='/header' element={<Header />} />
          <Route path='/filters' element={<FiltersCard />} />
          <Route path='/addP' element={<AddProductForm />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
