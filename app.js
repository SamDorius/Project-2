import express, { text } from 'express';
import morgan from 'morgan';
import ViteExpress from 'vite-express';
import { Customer, Item, Cart, Card } from './database/model.js';
import bcrypt from "bcrypt"

const app = express()

const ITEMS = 
[
    {
        itemId: 1,
        itemName: 'example',
        itemType: 'long sleeve',
        price: 25,
        available: true,
        description: 'white long sleeve tee with cross design',
        imageUrl: 'https://www.victoryforveteranswickerpark.org/wp-content/uploads/2021/07/t-shirt-placeholder.jpg',
        isEditing: false
    },
    {
        itemId: 2,
        itemName: 'example',
        itemType: 'example',
        price: 0,
        available: false,
        description: 'example example example',
        imageUrl: 'https://www.victoryforveteranswickerpark.org/wp-content/uploads/2021/07/t-shirt-placeholder.jpg',
        isEditing: false
      },
      {
        itemId: 3,
        itemName: 'example',
        itemType: 't shirt',
        price: 300,
        available: null,
        description: null,
        imageUrl: 'https://www.victoryforveteranswickerpark.org/wp-content/uploads/2021/07/t-shirt-placeholder.jpg',
        isEditing: false
      }
]

const port = 8080

app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.static('public'))
app.use(express.json())

ViteExpress.config({printViteDevServerHost: true})

// routes

app.get('/api/shop/items', async (req, res) =>
{
    let items = await Item.findAll()
    res.json(items)
})

// admin permission routes

app.post('/api/shop/item', async (req, res) =>
{
    const newItem = await Item.create
    (
        {
            itemName: '', 
            itemType: '', 
            price: 0, 
            imageUrl: '',
            isEditing: true
        }
    )
    
    ITEMS.push(newItem)

    console.log(ITEMS)

    res.json(newItem)
})

app.post('/api/shop/item/delete/:id', async (req, res) =>
{
    const {id} = req.params

    const index = ITEMS.findIndex((e) => e.itemId === +id)

    ITEMS.splice(index, 1)

    const dbItem = await Item.findByPk(id)

    await dbItem.destroy()

    res.json({id: +id})
})

app.post('/api/shop/item/:id', async (req, res) =>
{
    const {id} = req.params
     
    const {itemName, itemType, imageUrl, price, available, description} = req.body

    const index = ITEMS.findIndex((e) => e.itemId === +id)

    const item = ITEMS[index]
    

    const dbItem = await Item.findByPk(id)
    

    if (itemName)
    {
        dbItem.itemName = itemName ?? dbItem.itemName
        item.itemName = itemName ?? item.itemName
    }
    if (itemType)
    {
        dbItem.itemType = itemType ?? dbItem.itemType
        item.itemType = itemType ?? item.itemType
    }
    if (imageUrl)
    {
        dbItem.imageUrl = imageUrl ?? dbItem.imageUrl
        item.imageUrl = imageUrl ?? item.imageUrl
    }
    if (price)
    {
        dbItem.price = price ?? dbItem.price
        item.price = price ?? item.price
    }
    if (available)
    {
        dbItem.available = available ?? dbItem.available
        item.available = available ?? item.available
    }
    if (description)
    {
        dbItem.description = description ?? dbItem.description
        item.description = description ?? item.description
    }

    await dbItem.save()
    
    res.json(dbItem)
})



// log in sign up end points

app.post('/api/signUp', async (req, res) =>
{
    console.log(req.body)

    const {email, password} = req.body

    bcrypt.genSalt(10, (err, salt) => 
    {
        bcrypt.hash(password, salt, async function(err, hash) 
        {
            if (await Customer.findOne({where: {email: email}}))
            {
                res.json({message: 'user already exists'})
                console.log('here')
            }
            else
            {
                let newCustomer = await Customer.create({email: email, password: hash})
                res.json({message: "account created"})
            }
        });
    })
})

app.post('/api/logIn', async (req, res) =>
{
    const {email, password} = req.body

    let customer = await Customer.findOne({where: {email: email}, attributes: ['password', "customerId"]})

    if (!customer)
    {
        res.json({message: 'user not found'})
        console.log('no user')
    }
    else
    {
        let hash = customer.password
    
        bcrypt.compare(password, hash, async function(err, result)
        {
            if (result)
            {
                if (await Customer.findOne({where: {email: 'doriussam@gmail.com', password: hash}}))
                {
                    res.json({message: "admin logged in",  id: customer.customerId})
                }
                // temp v
                else if (await Customer.findOne({where: {email: 'x', password: hash}}))
                {
                    res.json({message: "admin logged in",  id: customer.customerId})
                }
                // temp ^
                else if (await Customer.findOne({where: {email: email, password: hash}}))
                {
                    res.json({message: "user logged in", id: customer.customerId})
                }
            }
            else
            {
                res.json({message: 'password was incorrect'})
                console.log(err)
            }
        })

    }

})

// shopping cart routes

app.post('/api/cart/addItem/:id', async (req, res) =>
{
    let {id} = req.params
    let {email} = req.body
    
    let user = await Customer.findOne({where: {email: email}, attributes: ["customerId"]})

    console.log(user.customerId)

    let newCartItem = await Cart.create({customerId: user.customerId, itemId: id})
    
})

app.post('/api/cart/:id', async (req, res) =>
{
    let {id} = req.params
    
    let cart = await Cart.findAll({where: {customerId: id}, attributes: ["customerId", "itemId"]})

    console.log(cart)

    let cartItems = []

    for (let i = 0; i < cart.length; i++)
    {
        cartItems.push(await Item.findOne({where: {itemId: cart[i].itemId}}))
    }

    console.log(cartItems)

    res.json(cartItems)
})

app.post('/api/cart/items', async (req, res) =>
{
    let {customerId, itemId} = req.body

    console.log(itemId)
})

app.post('/api/addCard', async (req, res) =>
{
    let {customerId, firstName, lastName, address, city, postalCode, cardNumber, nameOnCard, expDate, cvc} = req.body

    let newCard = await Card.create({customerId: customerId, firstName: firstName, lastName: lastName, address: address, city: city, postalCode: postalCode, cardNumber: cardNumber, nameOnCard: nameOnCard, expDate: expDate, cvc: cvc})

    res.json(newCard)
})

app.post('/api/deleteCart', async (req, res) =>
{
    let {customerId} = req.body

    console.log(customerId)

    await Cart.destroy({ where: {customerId: customerId}})
})



ViteExpress.listen(app, port, () => console.log('running'))