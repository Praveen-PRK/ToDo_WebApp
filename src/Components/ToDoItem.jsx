const ToDoItem = ({taskData,toggelTask,handleDelete})=>{
    return (
        <li style={{backgroundColor:taskData.isCompleted ? "lightgreen" : "white"}}>
            <input type="checkbox" checked={taskData.isCompleted} onChange={()=>toggelTask(taskData.id)}/>
            <span>{taskData.text}</span>
            <button className="delete" onClick={()=> handleDelete(taskData.id)}>Delete</button>
        </li>);
}
export default ToDoItem;