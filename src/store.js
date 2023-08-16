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