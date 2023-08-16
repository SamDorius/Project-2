import express, { text } from 'express';
import morgan from 'morgan';
import ViteExpress from 'vite-express';
import { Customer, Item } from './database/model.js';
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
    res.json(ITEMS)
})

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

app.post('/api/shop/item/delete/:id', (req, res) =>
{
    const {id} = req.params

    const index = ITEMS.findIndex((e) => e.id === +id)

    ITEMS.splice(index, 1)

    res.json({id: +id})
})

app.post('/api/shop/item/:id', async (req, res) =>
{
    const {id} = req.params
     
    const {itemName, itemType, imageUrl, price, available, description} = req.body

    const index = ITEMS.findIndex((e) => e.itemId === +id)

    const item = ITEMS[index]
    console.log(`here` + index)
    console.log(item)

    const dbItem = await Item.findByPk(id)

    if (itemName)
    {
        dbItem.itemName = item.itemName ?? dbItem.itemName
    }
    if (itemType)
    {
        dbItem.itemType = item.itemType ?? dbItem.itemType
    }
    if (imageUrl)
    {
        dbItem.imageUrl = item.imageUrl ?? dbItem.imageUrl
    }
    if (price)
    {
        dbItem.price = item.price ?? dbItem.price
    }
    if (available)
    {
        dbItem.available = item.available ?? dbItem.available
    }
    if (description)
    {
        dbItem.description = item.description ?? dbItem.description
    }

    await dbItem.save()
    console.log(dbItem)
    res.json(dbItem)
})












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

    let customer = await Customer.findOne({where: {email: email}, attributes: ['password']})

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
                    res.json({message: "admin logged in"})
                }
                // temp v
                else if (await Customer.findOne({where: {email: 'x', password: hash}}))
                {
                    res.json({message: "admin logged in"})
                }
                // temp ^
                else if (await Customer.findOne({where: {email: email, password: hash}}))
                {
                    res.json({message: "user logged in"})
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


ViteExpress.listen(app, port, () => console.log('running'))