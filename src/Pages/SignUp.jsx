import { Link } from "react-router-dom"

export default function SignUp()
{
    return (
        <>
            <div>
                <h2>Sign Up</h2>
                <label for="email">Email:</label>
                <input type="text" id="email"/>
                <label for="password">Password:</label>
                <input type="text" id="password"/>
                <input type="submit"/>
                <Link class="link" to="/login">Already have an account? Log in</Link>
                <Link class="link" to="/">Return to home page</Link>
            </div>
        </>
    )
}