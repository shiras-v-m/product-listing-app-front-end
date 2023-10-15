import { useState } from 'react'
import './App.css'
import CreateCategory from './CreateCategory/CreateCategory'
import { Route, Routes } from 'react-router-dom'
import AddProduct from './AddProduct/AddProduct'

function App() {
  const [count, setCount] = useState(0)

  return (
   <Routes>
    <Route path='/' element={<><CreateCategory/></>} />
    <Route path='/createcategory' element={<CreateCategory/>} />
    <Route path='/addproduct' element={<AddProduct/>} />

    </Routes>
  )
}

export default App
