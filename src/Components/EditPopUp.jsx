const EditPopUp = ({editedText,setEditedText,handleCancel,handleSave})=>{
    const handleEdit = (e)=>{
        setEditedText(e.target.value);
    }
    return (
        <div className="modal-overlay">
            <div className="modal">
                <textarea 
                    value={editedText}
                    onChange={handleEdit}
                />
                <div className="modal-buttons">
                    <button className="edit_bt" onClick={handleCancel}>Cancel</button>
                    <button className="save_bt" onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    );
}

export default EditPopUp;