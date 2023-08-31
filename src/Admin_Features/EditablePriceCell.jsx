
export default function EditablePriceCell({price, isEditing, onValueChange})
{
    return isEditing ? (
        <div className="editRow">
            <label htmlFor="price">Price: </label>
            <input type="number" value={price} onChange={(e) => onValueChange(e.target.value)} />
        </div>
    ) : (
        <div>
            <h3 className="price">{price}</h3>
        </div>
    )
}