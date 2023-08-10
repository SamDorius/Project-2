import LogIn from "./LogIn"
import ShoppingCart from "./ShoppingCart"
import { Link } from "react-router-dom"
import './HomePage.css'

export default function Home()
{
    return (
        <>
            <div class="page">
                <div class="topBar">
                    <Link class="link" to="/login">Log In</Link>
                    <Link class="link" to="/cart">Shopping Cart</Link>
                    <h1 class="logo">LOGO GOES HERE</h1>
                    <h2 class="searchBar">(Search Bar Will Go Here)</h2>
                </div>

                <div class="product">
                    <img class="tee" src="https://www.victoryforveteranswickerpark.org/wp-content/uploads/2021/07/t-shirt-placeholder.jpg" alt="tee shirt place holder image"/>
                    <h3 class="price">Price: $$$</h3>
                    <Link class="link" to="/product">Details</Link>
                </div>

                <footer>
                    <h2 class="footer">&copy;</h2>
                </footer>
            </div>
        </>
    )
}