import LogIn from "./LogIn"
import ShoppingCart from "./ShoppingCart"
import { Link } from "react-router-dom"
import './HomePage.css'
import { useState } from "react"
import { useSelector } from 'react-redux'
import axios from "axios"
import Products from "./Products"
import { useEffect } from "react"


export default function Home({items})
{
    const logInMessage = useSelector((state) => state.message)
    const userEmail = useSelector((state) => state.email)

    const [itemList, setItemList] = useState(items)
    const [isEditing, setIsEditing] = useState(false)

    
    const addItem = async () =>
    {
        const {data} = await axios.post('/api/shop/item')

        // console.log(data)
        
        const newItem = {...data}
        
        setItemList([...itemList, newItem])
    }

    const deleteItem = async (id) =>
    {
        const {data} = await axios.post(`/api/shop/item/delete/${id}`)

        const newItemList = [...itemList]

        const index = newItemList.findIndex((item) => item.id === id)

        newItemList.splice(index, 1)

        setItemList(newItemList)
    }
    
    
    const itemsDisplay = itemList.map((item) =>
    {
        const {itemId, itemName, itemType, price, available, description, imageUrl, isEditing} = item

        console.log(itemId)

        return (
                <Products item={{itemId, itemType, itemName, available, description, price, imageUrl, isEditing}} key={itemId} onDeleteClick={() => deleteItem(itemId)}/>
        )
    })
    


    return (
        <>
            <div className="page">
                <div className="topBar">
                    { logInMessage === '' && <Link className="link" to="/login">Log In</Link>}
                    { logInMessage === 'user logged in' &&  <div>Signed in with the email: {userEmail}</div>}
                    { logInMessage === 'admin logged in' &&  <div>You're the admin bro</div>}
                    <Link className="link" to="/cart">Shopping Cart</Link>
                    <h1 className="logo">LOGO GOES HERE</h1>
                    <h2 className="searchBar">(Search Bar Will Go Here)</h2>
                </div>

                { logInMessage !== 'admin logged in' &&
                    <>
                        {itemsDisplay}
                    </>
                }

                { logInMessage === 'admin logged in' && 
                    <>
                        <div className="test">
                            {itemsDisplay}
                            <button onClick={addItem}>+</button>
                        </div>
                    </>
                }


                <footer>
                    <h2 className="footer">&copy;</h2>
                </footer>
            </div>
        </>
    ) 
}