
export default function EditableDescriptionCell({description, onValueChange, isEditing})
{
    return isEditing ? (
        <div className="editRow">
            <label htmlFor="description">Description: </label>
            <input type="text" value={description} onChange={(e) => onValueChange(e.target.value)} id="description"/>
        </div>
    ) : (
        <div>
            
        </div>
    )
}