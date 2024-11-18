import Cookies from 'js-cookie'
import MoneyManager from '../MoneyManager'
import LoginForm from '../LoginForm'

const ProtectedRoute=()=>{
    const cookieToken= Cookies.get('jwtToken')
    if (cookieToken === undefined){
        return (<LoginForm />)
    }else{
        return (<MoneyManager/>)
    }
}

export default ProtectedRoute