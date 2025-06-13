import { useEffect, useState } from "react";
import TodoCard from "./TodoCard";
import toast, {Toaster} from 'react-hot-toast';


function App(){
  const [todoItem, setTodoItem] = useState({
    task: "",
    priority: "",
  });
  const [todoList, setTodoList] = useState([]);
  const[selectedTab, setSelectedTab] = useState("All");

  // save list to localstorage 0n every change

    useEffect(() =>{
      if(todoList.length == 0) return;
     
      localStorage.setItem("todoList", JSON.stringify(todoList));
          }, {todoList});

          //load list from localstorage on first render

  useEffect(() =>{
    const listFromlS = JSON.parse(localStorage.getItem("todolist") || "[]");
    setTodoList(listFromlS)
  },[]);


  const onDelete = (index) => {
        const listAfterDeletion = todoList.filter((_, i) => i!= index);
        setTodoList(listAfterDeletion);
        toast.success("task Deleted successfully")
  };

 return(
  <div className="bg-amber-100 main-h-screen">
  <div className="flex justify-around border-b-2 border-slate-400 pt-4">
    {
      ["All", "High", "Medium", "Low"].map((tab, i)=>{
        return( 
        <span 
        className={` block w-[250px] text-xl text-center rounded-tl-lg rounded-tr-lg py-1
          cursor-pointer ${
         tab == selectedTab ? "bg-pink-400 text-white" : "bg-white"
         }`} 
         key={i}
         onClick={() => setSelectedTab(tab)}
        >
          {tab}
          </span>
        );

      })}
    
  </div>

      
      <div className="h-[60vh] md:h-[80vh] overflow-scroll">
        {todoList.map((taskItem, index)=>{
          const {task, priority} = taskItem;

        if(selectedTab != "All" && priority != selectedTab){
          return null;
        }


          return (
          <TodoCard 
          task={task}
          priority={priority}
          key={index}
          index={index}
          onDelete={onDelete}/>

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
      
      <option value={"All"}>All</option>
    <option value={"High"}>High</option>
    <option value={"Medium"}>Medium</option>
    <option value={"Low"}>Low</option>

    </select>
      <button 
      className="text-xl bg-yellow-500 px-10 py-2 rounded-md ml-15 mt-8 md:mt-0 w-[110px]
      cursor-pointer"
   onClick={()=>{

    if(!todoItem.task){
      toast.error('please enter task');
      return;
    }
    if(!todoItem.priority){
      toast.error('please enter priority');
      return;
    }
    setTodoList([todoItem, ...todoList]);
    setTodoItem({
      task: "",
      priority: "",
    });
    toast.success('task added successfully');
   }}

      >
        Add
        </button>
    </div>
    <Toaster />
    </div>
  );
}
export default App;