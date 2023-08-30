import LogIn from "./LogIn"
import ShoppingCart from "./ShoppingCart"
import { Link } from "react-router-dom"
import './HomePage.css'
import { useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios"
import Products from "./Products"
import { useEffect } from "react"


export default function Home({items})
{

    const dispatch = useDispatch()

    const logInMessage = useSelector((state) => state.message)
    const userEmail = useSelector((state) => state.email)
    const userId = useSelector((state) => state.userId)

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

    const getCart = async () =>
    {
        if (userId)
        {
            const {data} = await axios.post(`/api/cart/${userId}`)
    
            console.log(data)
    
            dispatch({'type': 'SET_CART', 'payload': data})
        }
    }
    
    
    const itemsDisplay = itemList.map((item) =>
    {
        const {itemId, itemName, itemType, price, available, description, imageUrl, isEditing} = item

        return (
                <Products item={{itemId, itemType, itemName, available, description, price, imageUrl, isEditing}} key={itemId} onDeleteClick={() => deleteItem(itemId)}/>
        )
    })
    


    return (
        <>
            <div className="page">
                <div className="topBar">
                    { logInMessage === '' && <Link className="link" to="/login">Log In</Link>}
                    { logInMessage === 'user logged in' &&  <div className="signedIn">Signed in with the email: {userEmail}</div>}
                    { logInMessage === 'admin logged in' &&  <div className="signedIn">You're the admin bro</div>}
                    <h1 className="logo">Sudo Vintage</h1>
                    <Link onClick={getCart} className="link" to="/cart">Shopping Cart</Link>
                </div>

                { logInMessage !== 'admin logged in' &&
                    <div className="products">
                        {itemsDisplay}
                    </div>
                }

                { logInMessage === 'admin logged in' && 
                        <div className="products">
                            {itemsDisplay}
                            <button onClick={addItem}>+</button>
                        </div>
                }


                <footer>
                    <h2 className="footer">&copy;</h2>
                </footer>
            </div>
        </>
    ) 
}