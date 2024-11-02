import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Menu from './Components/Menu/Menu'
import RoutesMain from './Components/Routes/Routes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <h2>Teste de site</h2>
    <Menu />
    <RoutesMain />
    </>
  )
}

export default App
