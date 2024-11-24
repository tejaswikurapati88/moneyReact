import MoneyManager from './components/MoneyManager'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import './App.css'
import LoginForm from './components/LoginForm'

const App = () => {
  const onSetname=(namevalue)=>{
    localStorage.setItem('name', namevalue)
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<MoneyManager />} />
        <Route exact path='/login' element={<LoginForm  onName={onSetname} />} />
      </Routes>
    </BrowserRouter>
)}

export default App