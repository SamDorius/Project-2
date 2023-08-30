import { Customer, Cart, Sale, Item, Card, db  } from "./model.js"


await db.sync({ force: true })


await Customer.bulkCreate
(
    [
        {email: 'yahtzee@go.com', password: 'password'},
        {email: 'example@gmail.com', password: 'yeah'},
        {email: 'example1@go.com', password: 'example'}
    ]
)

await Item.bulkCreate
(
    [
        {itemType: "long sleeve", itemName: 'example', price: 25, available: true, description: "white long sleeve tee with cross design", imageUrl: "https://www.victoryforveteranswickerpark.org/wp-content/uploads/2021/07/t-shirt-placeholder.jpg", isEditing: false},
        {itemType: "example", itemName: 'example', price: 0, available: false, description: "example example example", imageUrl: "https://www.victoryforveteranswickerpark.org/wp-content/uploads/2021/07/t-shirt-placeholder.jpg", isEditing: false},
        {itemType: "t shirt", itemName: 'example', price: 300, imageUrl: "https://www.victoryforveteranswickerpark.org/wp-content/uploads/2021/07/t-shirt-placeholder.jpg", isEditing: false}
    ]
)

await Cart.bulkCreate
(
    [
        {customerId: 2, itemId: 1},
        {customerId: 2, itemId: 2}
    ]
)

await Sale.bulkCreate
(
    [
        {customerId: 1, itemId: 3, price: 300},
        {customerId: 1, itemId: 2, price: 0}
    ]
)

await Card.bulkCreate
(
    [
        {customerId: 1, firstName: 'yeah', lastName: 'yeah', address: 'yeah', city: 'yeah', postalCode: 1, cardNumber: 2, nameOnCard: 'yeah', expDate: '12/23/04', cvc: 123}
    ]
)

await db.close()