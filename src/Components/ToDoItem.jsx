const ToDoItem = ({taskData,toggleTask,handleDelete})=>{
    return (
        <li className={`todoItem ${taskData.isCompleted ? "completed" : ""}`}>
            {/* LEFT SIDE */}
            <div className="left">
                <input
                type="checkbox"
                checked={taskData.isCompleted}
                onChange={() => toggleTask(taskData.id)}
                />

                <span className="taskText">{taskData.text}</span>
            </div>
            <button className="delete" onClick={()=> handleDelete(taskData.id)}>Delete</button>
        </li>
    );
}
export default ToDoItem;