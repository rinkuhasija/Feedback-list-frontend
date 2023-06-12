import './App.css'
import Login from './pages/Login/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './pages/Register/Register'
import Navbar from './Components/Navbar/Navbar'
import Header from './Components/Header/Header'
import FiltersCard from './Components/FiltersCard/FiltersCard'
import Feedbacks from './pages/Feedbacks/Feedbacks'
import AddProductForm from './Components/AddProductForm/AddProductForm'
import { AuthProvider } from './context/AuthContext.jsx'
import { DataProvider } from './context/DataContext'

function App() {

  return (
    <>
      <AuthProvider>
        <DataProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/' element={<Feedbacks />} />

              <Route path='/nav' element={<Navbar />} />
              <Route path='/header' element={<Header />} />
              <Route path='/filters' element={<FiltersCard />} />
              <Route path='/addP' element={<AddProductForm />} />

            </Routes>
          </BrowserRouter>
        </DataProvider>
      </AuthProvider>
    </>
  )
}

export default App
