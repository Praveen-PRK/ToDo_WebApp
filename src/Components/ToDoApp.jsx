import { useState } from "react";
import ToDoItem from "./ToDoItem";
import EditPopUp from "./EditPopUp";

function ToDoApp(){
    // Input Task
    const [task,setTask] = useState("");
    // Task Data
    const [taskList,setTaskList] = useState([]);
    // Filter Value
    const [filter,setFilter] = useState("all");
    // Edit Popup
    const [isEditing, setIsEditing] = useState(false);
    // Current Edit Task
    const [currentTask, setCurrentTask] = useState(null);
    // Task Text After Editing (for Edit popup)
    const [editedText, setEditedText] = useState("");

    // --- ADDING TASK
    const handleAddTask = ()=>{
        if(task.trim() === "") return;
        setTaskList(
            [...taskList,
                {
                    id: Date.now(),
                    text: task,
                    isCompleted: false
                }
            ]
        );
        setTask("");
    }

    // --- DELETING TASK
    const handleDelete = (id)=>{
        const newTaskList = taskList.filter(t => t.id !== id);
        setTaskList(newTaskList);
    }

    // ENTER KEY TO ADD
    const handleKey = (e)=>{
        if(e.key === "Enter"){
            handleAddTask();
        }
    }

    // --- CHECKBOX TOGGLE COMPLETENESS STATE
    const toggleTask = (id)=>{
        const updatedList = taskList.map(t=>{
            return t.id === id ? {...t,isCompleted: !t.isCompleted} : t
        });
        setTaskList(updatedList);
    }

    // --- FILTER
    // --- Filter task based on completed or not
    const filteredTask = taskList.filter(task => {
        if(filter === "active") return !task.isCompleted;
        if(filter === "completed") return task.isCompleted;
        // for showing all task
        return true;
    });

    const handleEditClick = (task) => {
        setCurrentTask(task);
        setEditedText(task.text);
        setIsEditing(true);
    };

    const handleSave = ()=>{
        const updatedTask = taskList.map(t => 
            t.id === currentTask.id ? {...t,text:editedText} : t
        );
        setTaskList(updatedTask);
        setCurrentTask(null);
        setIsEditing(false);
    }

    const handleCancel = ()=>{
        setCurrentTask(null);
        setIsEditing(false);
    }

    return (
    <div className="toDoApp">
        {/* <h2>To Do List</h2> */}

        {isEditing &&
            <EditPopUp 
                editedText={editedText}
                setEditedText={setEditedText}
                handleCancel={handleCancel}
                handleSave={handleSave}
            />
        }

        {/* ----  TAKING TASK INPUT  ---- */}
        <div className="takingTask">
            <input 
                className="taskInput"
                value={task}
                onChange={(e)=>setTask(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Enter Task"
            />
            <button className="addBut" onClick={handleAddTask}>Add</button>
        </div>

        {/* -- FILTER  &  TOTAL TASKS */}
        <div>
            <div className="filters">
                <button 
                  className={filter === "all" ? "active" : ""}
                  onClick={()=>setFilter("all")}>
                    All
                </button>
                <button 
                  className={filter === "active" ? "active" : ""}
                  onClick={()=>setFilter("active")}>
                    Active
                </button>
                <button 
                  className={filter === "completed" ? "active" : ""}
                  onClick={()=>setFilter("completed")}>
                    Completed
                </button>
            </div>
            <p className="totalTask">Total Tasks - {filteredTask.length}</p>
        </div>

        {/* -- ACTUAL TASKS */}
        <div>
            <ul>
                {filteredTask.map((textTask)=>
                    // --  ToDoItem  --
                    (<ToDoItem key={textTask.id} taskData={textTask} toggleTask={toggleTask} handleDelete={handleDelete} handleEditClick={handleEditClick}/>)
                )}
            </ul>
        </div>
    </div>);
}
export default ToDoApp;