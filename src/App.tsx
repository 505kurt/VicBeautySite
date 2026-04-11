import './App.css'
import { Routes, Route } from "react-router-dom"

import Home from './pages/Home'
import Background from './components/Background'

function App() {

  return (
    <Routes>
      <Route element={<Background />}>
        <Route path='/' element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App
