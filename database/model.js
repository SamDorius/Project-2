import { DataTypes, Model } from 'sequelize';
import util from 'util';
import connectToDB from './db.js';

export const db = await connectToDB('postgresql:///shop');

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
        itemName:
        {
            type: DataTypes.STRING(200),
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
        },
        imageUrl:
        {
            type: DataTypes.STRING(500),
            allowNull: false
        },
        isEditing:
        {
            type: DataTypes.BOOLEAN,
            allowNull: false
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

export class Card extends Model 
{
    [util.inspect.custom]() 
    {
        return this.toJSON();
    }
}

Card.init(
    {
        checkOutId: 
        {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        firstName:
        {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        lastName:
        {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        address:
        {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        city:
        {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        postalCode:
        {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cardNumber:
        {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        nameOnCard:
        {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        expDate:
        {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        cvc:
        {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        modelName: "checkout",
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

Customer.hasMany(Card, { foreignKey: "customerId" })
Card.belongsTo(Customer, { foreignKey: "customerId" })

export default db