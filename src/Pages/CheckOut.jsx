import { Link } from "react-router-dom";

export default function CheckOut()
{
    return (
        <div>
            <h1>This is your checkout page foo</h1>
            <Link class="link" to="/cart">Return to cart</Link>
            <Link class="link" to="/">Return to Home Page</Link>
        </div>
    )
}