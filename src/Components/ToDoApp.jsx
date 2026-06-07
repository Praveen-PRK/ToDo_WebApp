import { useState } from "react";
import ToDoItem from "./ToDoItem";

function ToDoApp(){
    const [task,setTask] = useState("");
    const [taskList,setTaskList] = useState([]);
    const [filter,setFilter] = useState("all");

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
    })
    return (<div>
        {/* <h2>To Do List</h2> */}

        {/* ----  TAKING TASK INPUT  ---- */}
        <input 
            className="taskInput"
            value={task}
            onChange={(e)=>setTask(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Enter Task"
        />
        <button className="addBut" onClick={handleAddTask}>Add</button>

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
                    (<ToDoItem key={textTask.id} taskData={textTask} toggleTask={toggleTask} handleDelete={handleDelete}/>)
                )}
            </ul>
        </div>
    </div>);
}
export default ToDoApp;