import MoneyManager from './components/MoneyManager'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'
import LoginForm from './components/LoginForm'

const App = () => (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<MoneyManager />} />
        <Route exact path='/login' element={<LoginForm />} />
        <Route exact path='/protect' element={<ProtectedRoute />} />
        
      </Routes>
    </BrowserRouter>
)

export default App