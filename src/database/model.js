import sequelize, { DataTypes, Model } from 'sequelize';
import util from 'util';
import connectToDB from './db.js';

const db = await connectToDB('postgresql:///shop');

export class Customer extends Model 
{
    [util.inspect.custom]() 
    {
        return this.toJSON();
    }
}

Customer.init(
    {
        customerId:
        {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        email:
        {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        password:
        {
            type: DataTypes.STRING(200),
            allowNull: false
        }
    },
    {
        modelName: 'customer',
        sequelize: db
    }
)

export class Cart extends Model 
{
    [util.inspect.custom]() 
    {
        return this.toJSON();
    }
}

Cart.init(
    {
        cartId:
        {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        }
    },
    {
        modelName: 'cart',
        sequelize: db
    }
)

export class Item extends Model 
{
    [util.inspect.custom]() 
    {
        return this.toJSON();
    }
}

Item.init(
    {
        itemId:
        {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        itemType:
        {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        price:
        {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        available:
        {
            type: DataTypes.BOOLEAN
        },
        description:
        {
            type: DataTypes.STRING(400)
        }
    },
    {
        modelName: "item",
        sequelize: db
    }
)

export class Sale extends Model 
{
    [util.inspect.custom]() 
    {
        return this.toJSON();
    }
}

Sale.init(
    {
        salesId:
        {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        date:
        {
            type: DataTypes.DATE,
            allowNull: false
        },
        price:
        {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        modelName: "sale",
        sequelize: db
    }
)

// Relationships

Customer.hasMany(Cart, { foreignKey: 'customerId' })
Cart.belongsTo(Customer, { foreignKey: 'customerId' })


Item.hasMany(Cart, { foreignKey: "itemId" })
Cart.belongsTo(Item, { foreignKey: "itemId" })


Customer.hasMany(Sale, { foreignKey: "customerId" })
Sale.belongsTo(Customer, { foreignKey: "customerId" })


Item.hasMany(Sale, { foreignKey: "itemId" })
Sale.belongsTo(Item, { foreignKey: "itemId" })


await db.sync({ force: true })


// seeding database with test data

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
        {itemType: "long sleeve", price: 25, available: true, description: "white long sleeve tee with cross design"},
        {itemType: "example", price: 0, available: false, description: "example example example"},
        {itemType: "t shirt", price: 300}
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
        {customerId: 1, itemId: 3, price: 300, date: 2023-2-13},
        {customerId: 1, itemId: 2, price: 0, date: 2023-8-8}
    ]
)


await db.close()

export default db