
export default function EditButtons({isEditing, deleteClick, onSaveClick, onEditClick})
{
    return isEditing ? (
        <>
            <div>
                <button className="editButton" onClick={onSaveClick}>Save</button>
            </div>
        </>
    ) : (
        <>
            <div>
                <button className="editButton" onClick={onEditClick}>Edit</button>
                <button className="editButton" onClick={deleteClick}>Delete</button>
            </div>
        </>
    )

}