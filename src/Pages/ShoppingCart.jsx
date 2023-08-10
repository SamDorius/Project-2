import { Link, Route } from "react-router-dom"

export default function ShoppingCart()
{
    return (
        <>
            <h1>This is ur shopping cart foo</h1>
            <Link class="link" to="/">Return to Home Page</Link>
            <Link class="link" to="/checkout">Proceed to Checkout</Link>
        </>
    )
}