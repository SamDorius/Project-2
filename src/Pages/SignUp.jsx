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
        <div className="logInPage">
            <div className="logInBox">
                <h2 className="logInHeader">Sign Up</h2>
                <div>
                    <input onChange={(event) => {setEmail(event.target.value)}} type="text" id="email" placeholder="Email:"/>
                </div>
                <div>
                    <input onChange={(event) => {setPassword(event.target.value)}} type="text" id="password" placeholder="Password:"/>
                </div>
                <div>
                    <input type="submit" onClick={ClickSignUp}/>
                </div>
                <div className="links">
                    <Link className="link" to="/login">Already have an account? Log in</Link>
                    <Link className="link" to="/">Return to home page</Link>
                </div>
            </div>
            { signUpMessage === 'user already exists' && <h1>An Account Already Exists With That Email</h1>}
        </div>
    )
}