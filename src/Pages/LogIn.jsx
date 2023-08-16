import { Link, Navigate, Route } from "react-router-dom"
import axios from "axios"
import { useState } from "react"
import { useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"



export default function LogIn()
{

    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    let navigate = useNavigate()

    const ClickLogIn = async () =>
    {
        const user = {email: email, password: password}

        const {data} = await axios.post('http://localhost:8080/api/logIn', user)

        if (data.message === "user logged in")
        {
            dispatch({'type': 'SET_MESSAGE', 'payload': 'user logged in'})
            dispatch({'type': 'SET_EMAIL', 'payload': user.email})

            navigate('/')
        }
        else if (data.message === "admin logged in")
        {
            dispatch({'type': "SET_MESSAGE", 'payload': 'admin logged in'})

            navigate('/')
        }
        else if (data.message === 'user not found')
        {
            dispatch({'type': 'SET_MESSAGE', 'payload': 'user not found'})
        }
        else if (data.message === 'password was incorrect')
        {
            dispatch({'type': 'SET_MESSAGE', 'payload': 'password was incorrect'})
        }
    }

    const logInMessage = useSelector((state) => state.message)

    return (
        <>
            { logInMessage === 'account created' && <h1>Account Successfully Created,</h1>}
            <div>
                <h2>Log In</h2>
                <label htmlFor="email">Email:</label>
                <input onChange={(event) => {setEmail(event.target.value)}} type="text" id="email"/>
                <label htmlFor="password">Password:</label>
                <input onChange={(event) => {setPassword(event.target.value)}} type="text" id="password"/>
                <input type="submit" onClick={ClickLogIn}/>
                <Link className="link" to="/signup">Sign Up</Link>
                <Link className="link" to="/">Return to Home Page</Link>
            </div>
            { logInMessage === 'user not found' && <h1>User Not Found</h1>}
            { logInMessage === 'password was incorrect' && <h1>Incorrect Password</h1>}
        </>
    )

}

