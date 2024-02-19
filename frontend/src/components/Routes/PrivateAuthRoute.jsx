import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginCheck } from '../../utils/loginCheck'
import { AppContext } from '../Context'

const PrivateAuthRoute = ({children}) => {

    const navigate = useNavigate()
    const {login,setLogin} = useContext(AppContext)
    useEffect(()=>{
        if(!login){
            navigate("/signup")
        }
    },[])

    return (
        <div>{children}</div>
    )
}

export default PrivateAuthRoute