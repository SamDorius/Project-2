
export default function EditableTypeCell({type, onValueChange, isEditing})
{
    return isEditing ? (
        <div className="editRow">
            <label htmlFor="type">Type: </label>
            <input type="text" value={type} onChange={(e) => onValueChange(e.target.value)} />
        </div>
    ) : (
        <div>
            <h3>{type}</h3>
        </div>
    )
}