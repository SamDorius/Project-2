import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function CheckOut()
{
    const total = useSelector((state) => state.total)
    const cart = useSelector((state) => state.cart)
    const customerId = useSelector((state) => state.userId)
    let display = useSelector((state) => state.display)
    
    let navigate = useNavigate()
    let dispatch = useDispatch()

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [address, setAdress] = useState("")
    const [city, setCity] = useState("")
    const [postalCode, setPostalCode] = useState(0)

    const [cardNumber, setCardNumber] = useState(0)
    const [nameOnCard, setNameOnCard] = useState("")
    const [expDate, setExpDate] = useState("")
    const [cvc, setCvc] = useState(0)

    const clickCheckOut = async () =>
    {
        console.log('why')

        const card = {customerId: customerId, firstName: firstName, lastName: lastName, address: address, city: city, postalCode: postalCode, cardNumber: cardNumber, nameOnCard: nameOnCard, expDate: expDate, cvc: cvc}

        `const {data} = await axios.post('/api/addCard', card)`

        if (data)
        {
            dispatch({'type': 'SET_DISPLAY', 'payload': 'done'})
            const id = {customerId: customerId}
            await axios.post('/api/deleteCart', id)
            navigate('/checkout')
        }
        else
        {
            dispatch({'type': 'SET_DISPLAY', 'payload': 'error'})
            navigate('/checkout')
        }
    }

    if (!display)
    {
        return (
            <div className="checkOutPage">
                <h1>Check Out Page: (Please do not enter in any real info)</h1>
                { cart && cart.length < 1 &&
                    <div>
                        <h2>Im sorry there are no items in your cart</h2>
                    </div>
                }
    
                { cart && cart.length > 0 &&
                    <div>
                        <div>
                            <h2>Total: ${total}</h2>
                            <h3>Shipping adress</h3>
                            <input onChange={(event) => {setFirstName(event.target.value)}} type="text" placeholder="First Name:"/>
                            <input onChange={(event) => {setLastName(event.target.value)}} type="text" placeholder="Last Name:"/>
                        </div>
                        <div>
                            <input onChange={(event) => {setAdress(event.target.value)}} type="text" placeholder="Address:"/>
                            <input onChange={(event) => {setCity(event.target.value)}} type="text" placeholder="City:"/>
                        </div>
                        <div>
                            <input onChange={(event) => {setPostalCode(event.target.value)}} type="text" placeholder="Postal Code:"/>
                        </div>
                        <div>
                            <h3>Card Info</h3>
                            <input onChange={(event) => {setCardNumber(event.target.value)}} type="text" placeholder="Card Number:"/>
                            <input onChange={(event) => {setNameOnCard(event.target.value)}} type="text" placeholder="Name on Card:"/>
                        </div>
                        <div>
                            <input onChange={(event) => {setExpDate(event.target.value)}} type="text" placeholder="Expiration Date:"/>
                            <input onChange={(event) => {setCvc(event.target.value)}} type="text" placeholder="CVC:"/>
                        </div>
                        <div>
                            <input className="submit" type="submit" onClick={clickCheckOut}/>
                        </div>
                    </div>
                }
                <div className="links">
                    <Link className="link" to="/cart">Return to cart</Link>
                    <Link className="link" to="/">Return to Home Page</Link>
                </div>
            </div>
        )
    }
    else if (display === 'done')
    {
        return (
            <div className="checkOutPage">
                <h1>Check Out Page: (Please do not enter in any real info)</h1>
                <h2>Thank you for your purchase !</h2>
                <div className="links">
                    <Link className="link" to="/cart">Return to cart</Link>
                    <Link className="link" to="/">Return to Home Page</Link>
                </div>
            </div>
        )
    }
    else if (display === 'error')
    {
        return (
            <div className="checkOutPage">
                <h1>Check Out Page: (Please do not enter in any real info)</h1>
                { cart && cart.length < 1 &&
                    <div>
                        <h2>Im sorry there are no items in your cart</h2>
                    </div>
                }
    
                { cart && cart.length > 0 &&
                    <div>
                        <div>
                            <h2>Total: ${total}</h2>
                            <h3>Shipping adress</h3>
                            <input onChange={(event) => {setFirstName(event.target.value)}} type="text" placeholder="First Name:"/>
                            <input onChange={(event) => {setLastName(event.target.value)}} type="text" placeholder="Last Name:"/>
                        </div>
                        <div>
                            <input onChange={(event) => {setAdress(event.target.value)}} type="text" placeholder="Address:"/>
                            <input onChange={(event) => {setCity(event.target.value)}} type="text" placeholder="City:"/>
                        </div>
                        <div>
                            <input onChange={(event) => {setPostalCode(event.target.value)}} type="text" placeholder="Postal Code:"/>
                        </div>
                        <div>
                            <h3>Card Info</h3>
                            <input onChange={(event) => {setCardNumber(event.target.value)}} type="text" placeholder="Card Number:"/>
                            <input onChange={(event) => {setNameOnCard(event.target.value)}} type="text" placeholder="Name on Card:"/>
                        </div>
                        <div>
                            <input onChange={(event) => {setExpDate(event.target.value)}} type="text" placeholder="Expiration Date:"/>
                            <input onChange={(event) => {setCvc(event.target.value)}} type="text" placeholder="CVC:"/>
                        </div>
                        <div>
                            <input className="submit" type="submit" onClick={clickCheckOut}/>
                        </div>
                    </div>
                }
                <h1>Uh Oh, something went wrong, check to make sure the information entered is correct</h1>
                <div className="links">
                    <Link className="link" to="/cart">Return to cart</Link>
                    <Link className="link" to="/">Return to Home Page</Link>
                </div>
            </div>
        )
    }
}