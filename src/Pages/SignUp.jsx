import { Link } from "react-router-dom"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"


export default function SignUp()
{
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    let navigate = useNavigate()

    const ClickSignUp = async () =>
    {
        const user = {email: email, password: password}

        const {data} = await axios.post('http://localhost:8080/api/signUp', user)

        if (data.message === 'account created')
        {
            dispatch({'type': 'SET_MESSAGE', 'payload': 'account created'})

            navigate('/login')
        }
        else if (data.message === 'user already exists')
        {
            dispatch({'type': 'SET_MESSAGE', 'payload': 'user already exists'})

            console.log('here')
        }
    }

    const signUpMessage = useSelector((state) => state.message)

    return (
        <>
            <div>
                <h2>Sign Up</h2>
                <label htmlFor="email">Email:</label>
                <input onChange={(event) => {setEmail(event.target.value)}} type="text" id="email"/>
                <label htmlFor="password">Password:</label>
                <input onChange={(event) => {setPassword(event.target.value)}} type="text" id="password"/>
                <input type="submit" onClick={ClickSignUp}/>
                <Link className="link" to="/login">Already have an account? Log in</Link>
                <Link className="link" to="/">Return to home page</Link>
            </div>
            { signUpMessage === 'user already exists' && <h1>An Account Already Exists With That Email</h1>}
        </>
    )
}