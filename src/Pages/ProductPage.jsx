import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

export default function Product()
{

    const item = useSelector((state) => state.item)

    console.log(item)
    

    return (
        <div className="detailsPage">
            <h1>Product Details</h1>
            <h2>{item.itemName}</h2>
            <img className="tee" src={item.imageUrl}/>
            <h2>$ {item.price}.00</h2>
            <h3>'{item.description}'</h3>
            <Link className="link" to="/">Return to Home Page</Link>
        </div>
    )
}