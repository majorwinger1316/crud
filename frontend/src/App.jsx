import { useState } from 'react'
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './App.css'
import Read from './pages/Read';
import Create from './pages/Create';
import Navbar from './components/Navbar';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='App'>
        <Router>
          <Navbar />
          <Routes> 
            <Route path='/' element={<Create />} />
            <Route path='/read' element={<Read />} />
          </Routes>
          {/* <Footer /> */}
        </Router>
      </div>
    </>
  )
}

export default App
