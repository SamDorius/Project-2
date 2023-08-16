import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './store.js'
import { Provider } from 'react-redux'
import axios from 'axios'


axios.get('/api/shop/items')
.then(({data}) =>
{
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <Provider store={store}>
        <App items={data}/>
      </Provider>
    </React.StrictMode>,
  )
})
