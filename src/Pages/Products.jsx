import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useState } from "react"
import axios from "axios"

import EditButtons from "../Admin_Features/EditButtons"
import EditableNameCell from "../Admin_Features/EditableNameCell"
import EditableImageCell from "../Admin_Features/EditableImageCell"
import EditablePriceCell from "../Admin_Features/EditablePriceCell"
import EditableTypeCell from "../Admin_Features/EditableTypeCell"
import EditableDescriptionCell from "../Admin_Features/EditableDescriptionCell"
import EditableAvailableCell from "../Admin_Features/EditableAvailableCell"

export default function Products({item, onDeleteClick})
{

    const isAdmin = useSelector((state) => state.message)


    const [isEditing, setIsEditing] = useState(item.isEditing)

    const [itemName, setName] = useState(item.itemName)
    const [itemType, setType] = useState(item.itemType)
    const [imageUrl, setImageUrl] = useState(item.imageUrl)
    const [price, setPrice] = useState(item.price)
    const [available, setAvailable] = useState(item.available)
    const [description, setDescription] = useState(item.description)

    const setEditing = () => setIsEditing(true)

    const setNormalMode = async () =>
    {
        console.log(item)
        const {data} = await axios.post(`/api/shop/item/${item.itemId}`, 
        {
            itemName, itemType, imageUrl, price, available, description
        })

        console.log(data)
        if (!data.error)
        {
            setName(data.itemName)
            setType(data.itemType)
            setImageUrl(data.imageUrl)
            setPrice(data.price)
            setAvailable(data.available)
            setDescription(data.description)
        }

        setIsEditing(false)
        console.log(name)
    }
    

    return (   
        <>
        
        { isAdmin === 'admin logged in' &&
            <>
                <div className="product">
                    <EditableNameCell onValueChange={setName} isEditing={isEditing} name={itemName}/>

                    <EditableTypeCell onValueChange={setType} isEditing={isEditing} type={itemType}/>

                    <EditableImageCell onValueChange={setImageUrl} isEditing={isEditing} imageUrl={imageUrl}/>

                    <EditablePriceCell onValueChange={setPrice} isEditing={isEditing} price={price}/>

                    <EditableAvailableCell onValueChange={setAvailable} isEditing={isEditing} available={available}/>

                    <EditableDescriptionCell onValueChange={setDescription} isEditing={isEditing} description={description}/>

                    <EditButtons isEditing={isEditing} deleteClick={onDeleteClick} onEditClick={setEditing} onSaveClick={setNormalMode} />
                </div> 
            </> 
        }

        { isAdmin !== 'admin logged in' && 
            <div className="product">
                <h3 className="price">{item.itemName}</h3>
                <img className="tee" src={item.imageUrl}/>
                <h3 className="price">Price: {item.price}</h3>
                <Link className="link" to="/product">Details</Link>
            </div> 
        }

        </>
    )
}