import { Link, Route } from "react-router-dom"


export default function LogIn()
{
    return (
        <>
            <div>
                <h2>Log In</h2>
                <label for="email">Email:</label>
                <input type="text" id="email"/>
                <label for="password">Password:</label>
                <input type="text" id="password"/>
                <input type="submit"/>
                <Link class="link" to="/signup">Sign Up</Link>
                <Link class="link" to="/">Return to Home Page</Link>
            </div>
        </>
    )
}