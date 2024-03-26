import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar.jsx'
import Manager from './Components/Manager.jsx'
import Footer from './Components/footer.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar/>
    <div className='min-h-[88vh]'>
      <Manager/>
    </div>
    <Footer/>
    </>
  )
}

export default App
