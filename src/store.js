import { configureStore } from '@reduxjs/toolkit'

let initalState = {message: ''}


const reducer = (state = initalState, action) =>
{
    switch(action.type)
    {
        case 'SET_MESSAGE':
            let newState = { ...state, message: action.payload }
            return newState
        case "SET_EMAIL":
            let emailState = { ...state, email: action.payload }
            return emailState
        case "SET_USER_ID":
            let userIdState = { ...state, userId : action.payload }
            return userIdState
        case "SET_CART":
            let cartState = { ...state, cart: action.payload }
            return cartState
        case "SET_TOTAL":
            let totalState = { ...state, total: action.payload }
            return totalState
        case "SET_ITEM":
            let itemState = { ...state, item: action.payload }
            return itemState
        case "SET_DISPLAY":
            let displayState = { ...state, display: action.payload }
            return displayState
        default:
            return state
    }
}


const store = configureStore(
    {
        reducer: reducer
    }
)

export default store