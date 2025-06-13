const TASK_PRIORITY_CLASES = {
  High: "border-t-6 border-t-green-500",
  Medium: "border-t-6 border-t-yellow-500",
  Low: "border-t-6 border-t-red-500"
};

const BADGE_PRIORITY_CLASSES = {
  High: "text-green-500 border-green-500",
  Medium: "text-yellow-500 border-yellow-500",
  Low: "text-red-500 border-red-500",
};

function TodoCard({task, priority,index, onDelete}){
    return(
        <div 
    
           className={`bg-pink p-5 m-5 shadow-lg rounded-md border-1  border-gray-200  relative  
            ${TASK_PRIORITY_CLASES[priority]}`}
           >
            

            <span className={`block w-[100px] border-1  text-center rounded-full
           ${BADGE_PRIORITY_CLASSES[priority]}`} >
              {priority}
              </span>
              <h1 className="mt-2 text-xl">{task}</h1>

            <button onClick={()=>{
             onDelete(index);

            }}
            className="bg-red-700 text-white text-xs px-5 py-1 rounded-full absolute  top-2 right-2 cursor-pointer"
                >
              Delete</button>


          
            </div>
    );
}
            
export default TodoCard