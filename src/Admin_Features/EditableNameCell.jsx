
export default function EditableNameCell({name, isEditing, onValueChange})
{
    return isEditing ? (
        <div>
            <input type="text" value={name} onChange={(e) => onValueChange(e.target.value)}/>
        </div>
    ) : (
        <div>
            <h3>{name}</h3>
        </div>
    )
}