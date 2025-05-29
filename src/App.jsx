import { useEffect, useState } from "react";
import TodoCard from "./TodoCard";


function App(){
  const [todoItem, setTodoItem] = useState({
    task: "",
    priority: "",
  });
  const [todoList, setTodoList] = useState([]);

    useEffect(() =>{
      if(todoList.length == 0) return;
     
      localStorage.setItem("todoList", JSON.stringify(todoList));
          }, {todoList});



  return(
    <div className="bg-amber-100 main-h-screen">
      
      <div className="h-[60vh] md:h-[80vh] overflow-scroll">
        {todoList.map((taskItem, index)=>{
          const {task, priority} = taskItem;
          return (
          <TodoCard index={index} task={task} priority={priority} key={index}/>
          );
        })}
      </div>
      <div className="fixed bottom-0 left-0 w-full bg-slate-400 py-10 flex flex-col 
       md:flex-row justify-center items-center p-5 gap-y-4">
      <input type="text" 
      onChange={(e)=>{
        setTodoItem({
          ...todoItem,
          task: e.target.value,

        });
      }}
      value={todoItem.task}
      className="bg-white text-xl w-full md:w-[400px] p-2 rounded-md  focus:outline-none"
      placeholder="Enter Task"/>

    <select
     className="text-xl bg-white w-full md:w-[200px] p-2 rounded-md ml-0 md:ml-5"
    onChange={(e)=>{
      setTodoItem({
        ...todoItem,
        priority: e.target.value
      })
    }}
    value={todoItem.priority}
    >
      
    <option value={""}>select priority</option>
    <option value={"High"}>High</option>
    <option value={"Medium"}>Medium</option>
    <option value={"Low"}>Low</option>

    </select>
      <button 
      className="text-xl bg-yellow-500 px-10 py-2 rounded-md ml-15 mt-8 md:mt-0 w-[150px]
      cursor-pointer"
   onClick={()=>{
    setTodoList([todoItem, ...todoList]);
    setTodoItem({
      task: "",
      priority: "",
    });
   }}

      >
        Add
        </button>
    </div>
    </div>
  );
}
export default App;