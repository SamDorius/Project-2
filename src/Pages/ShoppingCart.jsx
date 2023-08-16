import { Link, Route } from "react-router-dom"

export default function ShoppingCart()
{
    return (
        <>
            <h1>This is ur shopping cart foo</h1>
            <Link className="link" to="/">Return to Home Page</Link>
            <Link className="link" to="/checkout">Proceed to Checkout</Link>
        </>
    )
}