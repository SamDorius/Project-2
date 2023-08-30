import { Link, Route } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import { useState } from "react"


export default function ShoppingCart()
{
    const userId = useSelector((state) => state.userId)
    const cart = useSelector((state) => state.cart)

    const dispatch = useDispatch()

    let lastItem = {}
    let itemsArr = []
    let pastItems = []
    let totalPrice = 0

    const clickCheckOut = () =>
    {
        dispatch({'type': 'SET_TOTAL', 'payload': totalPrice})
    }
    
    return (
        <div className="cart">
            <h1>Shopping Cart:</h1>
            { !cart &&
                <div className="error">
                    <h3>Im sorry you aren't signed in</h3>
                    <Link className="link" to="/logIn">Log In</Link>
                </div>
            }

            { cart && cart.length < 1 &&
                <div>
                    <h3>There are no items in your cart</h3>
                </div>
            }
            
            { cart && 
                <div className="items">
                    <div>
                        {cart.map((item) =>
                        {
                            const {itemId, itemName, itemType, price, available, description, imageUrl, isEditing} = item
                            
                            totalPrice += price
                            
                            if (JSON.stringify(lastItem) === JSON.stringify(item))
                            {
                                if (!itemsArr[itemId])
                                {
                                    itemsArr[itemId] = 1
                                }
                                else
                                {
                                    itemsArr[itemId] += 1
                                }
                            }
                            else if (JSON.stringify(lastItem) !== JSON.stringify(item))
                            {
                                if (!itemsArr[itemId])
                                {
                                    itemsArr[itemId] = 1
                                }
                                else
                                {
                                    itemsArr[itemId] += 1
                                }
                                
                                if (!pastItems[itemId])
                                {
                                    pastItems[itemId] = item
                                }
                                
                                lastItem = item
                            }
                        })}
                        
                    </div>
                    <div>{pastItems.map((item) =>
                    {
                        const {itemId, itemName, itemType, price, available, description, imageUrl, isEditing} = item
                        
                        if (pastItems[itemId])
                        {
                            return (
                                <div className="item">
                                    <h3>{itemName}</h3>
                                    <img className="tee" src={imageUrl}/>
                                    <h3>${price}</h3>
                                    <div>Quantity: {itemsArr[itemId]}</div>
                                </div>
                            )
                        }
                    })}
                    </div>
                </div>
            }
            <Link className="link" to="/">Return to Home Page</Link>
            { cart && 
                <Link onClick={clickCheckOut} className="link" to="/checkout">Proceed to Checkout</Link>
            }
        </div>
    )
}