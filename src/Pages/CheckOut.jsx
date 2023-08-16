import { Link } from "react-router-dom";

export default function CheckOut()
{
    return (
        <div>
            <h1>This is your checkout page foo</h1>
            <Link className="link" to="/cart">Return to cart</Link>
            <Link className="link" to="/">Return to Home Page</Link>
        </div>
    )
}