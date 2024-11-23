import './index.css'
import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'

const LoginForm=()=>{
    const navigate= useNavigate()
    useEffect(()=>{
        const jwtTokenCookie= Cookies.get('jwtToken')
        if (jwtTokenCookie !== undefined){
            navigate('/')
        }
    })
    const [isSignin, setSignin]= useState(false)
    const [retypePass, setRetypePass]= useState('')
    const [typePass, setTypePass]= useState('')
    const [typeUsername, setTypeUsername]= useState('')
    const [signinError, setSigninError]= useState(false)
    const [errormsg, setErrmsg]= useState('')
    const [username, setusername]= useState('')
    const [userpassword, setUserPassword]= useState('')
    const [loginError, setloginError]= useState('')
    const [isloginError, setisloErr]= useState(false)

    const onSigninon=()=>{
        setSignin(false)
    }
    const onLoginon=()=>{
        setSignin(true)
    }
    const onTypeUsername=(eve)=>{
        setTypeUsername(eve.target.value)
    }
    const onTypePass=(eve)=>{
        setTypePass(eve.target.value)
    }
    const onRetypePass=(eve)=>{
        setRetypePass(eve.target.value)
    }
    const onSigninSubmition= async (event)=>{
        event.preventDefault()
        const signinData= {
            id: uuidv4(),
            username: typeUsername,
            password: typePass
        }
        if (typePass=== retypePass){
            const url='https://money-manager-backend-w7d8.onrender.com/api/users/signin'
            const options = {
                method: 'POST' ,
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(signinData)
            }
            const res = await fetch(url, options)
            if (res.ok){
                setusername('')
                setUserPassword('')
                setTypePass('')
                setTypeUsername('')
                setSignin(false)
            }
        }
        else {
            setSigninError(true)
            setErrmsg("**Confirm password didn't matched")
        }
    }

    const onUserLogin= async(event)=>{
        event.preventDefault()
        const userdetails= {username: username, password: userpassword}
        const url= 'https://money-manager-backend-w7d8.onrender.com/api/users/login'
        const options = {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(userdetails),
        }
        const response= await fetch(url, options)
        
        if (response.ok === true){
            
            const data= await response.json()
            const {jwtToken}= data
            Cookies.set('jwtToken', `${jwtToken} ${username}`, {expires: 30})
            navigate('/')
        }else{
            setisloErr(true)
            setloginError('**invalid Username or password')
        }
        
    }
    
    
    return (
        <div className='login-bg-container'>
            <div className='head'>
                <h1 className='log-head-logo'>Money Manager</h1>
                {
                isSignin? <button type='button' onClick={onSigninon} className='signinbtn'>Login</button>
                    :     <button type='button' onClick={onLoginon} className='signinbtn'>Signin</button>
                }
                
            </div>
            {isSignin? 
                    <form className='login-form' onSubmit={onSigninSubmition}>
                        <h1 className='login-heading'>User SignIn</h1>
                        <div className='username-cont'>
                            <label className='label' htmlFor='usernameinp'>Username</label>
                            <input type='text' id='usernameinp' onChange={onTypeUsername} value={typeUsername} 
                            className='log-inp' placeholder='Enter username'></input>
                        </div>
                        <div className='username-cont'>
                            <label className='label' htmlFor='userpassinp'>Password</label>
                            <input type='password' id='userpassinp' onChange={onTypePass} value={typePass} className='log-inp' placeholder='Enter password'></input>
                        </div>
                        <div className='username-cont'>
                            <label className='label' htmlFor='userpassinp'>Re-type Password</label>
                            <input type='password' id='userpassinp' onChange={onRetypePass} value={retypePass} className='log-inp' placeholder='Enter password'></input>
                        </div>
                        <button type='submit' className='btn-lo'>Signin</button>
                        {signinError && <p className='error'>{errormsg}</p>}
                    </form> 
                : 
                        <form onSubmit={onUserLogin} className='login-form'>
                                <h1 className='login-heading'>User Login</h1>
                                <div className='username-cont'>
                                    <label className='label' htmlFor='usernameinp'>Username</label>
                                    <input type='text' id='usernameinp' value={username}
                                    onChange={(e)=> setusername(e.target.value)} className='log-inp' placeholder='Enter username'></input>
                                </div>
                                <div className='username-cont'>
                                    <label className='label' htmlFor='userpassinp'>Password</label>
                                    <input type='password' id='userpassinp' value={userpassword}
                                    onChange={(e)=> setUserPassword(e.target.value)} className='log-inp' placeholder='Enter password'></input>
                                </div>
                                <button type='submit' className='btn-lo'>Login</button>
                                {isloginError && <p className='error'>{loginError}</p>}
                            </form> 
            }
            
        </div>
    )
}

export default LoginForm