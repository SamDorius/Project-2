
export default function EditableAvailableCell({available, isEditing, onValueChange})
{
    return isEditing ? (
        <div className="editRow">
            <label htmlFor="available">Available? </label>
            <label htmlFor="true">true </label>
            <input type="checkbox" value={true} onChange={(e) => onValueChange(e.target.value)} id="true"/>
            <label htmlFor="false"> false </label>
            <input type="checkbox" value={false} onChange={(e) => onValueChange(e.target.value)} id="false"/>
        </div>
    ) : (
        <div>
            
        </div>
    )
}