
export default function EditButtons({isEditing, deleteClick, onSaveClick, onEditClick})
{
    return isEditing ? (
        <>
            <div>
                <button onClick={onSaveClick}>Save</button>
            </div>
        </>
    ) : (
        <>
            <div>
                <button onClick={onEditClick}>Edit</button>
                <button onClick={deleteClick}>Delete</button>
            </div>
        </>
    )

}