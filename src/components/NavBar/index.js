import './index.css'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

const NavBar=()=>{
    const navigate= useNavigate()
    const onLogout=()=>{
        Cookies.remove('jwtToken', { path: '/' })
        navigate('/login')
    }
    return(
        <div className="bg-app-nav">
            <h1 className='nav-head'>Money Manager</h1>
            <button className='logout-btn' type='button' onClick={onLogout}>Logout</button>
        </div>
    )
}

export default NavBar
