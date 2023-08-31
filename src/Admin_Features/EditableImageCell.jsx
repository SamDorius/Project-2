
export default function EditableImageCell({imageUrl, onValueChange, isEditing})
{
    return isEditing ? (
        <div className="editRow">
            <label htmlFor="image">Image Url: </label>
            <input type="text" value={imageUrl} onChange={(e) => onValueChange(e.target.value)} />
        </div>
    ) : (
        <div>
            <img className="tee" src={imageUrl}/>
        </div>
    )

}