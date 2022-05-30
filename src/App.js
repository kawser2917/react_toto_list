import './App.css';
import {useState} from "react"
function App() {
  // i create this because it will be dynamic
  const [todoTitle,settodoTitle]=useState(" ")
  // i need to create a array to store the element which user will give
  const [todoList,settodoList]=useState([])

  const [editMode,seteditMode]=useState(false)

  const [editableTodo,seteditableTodo]=useState(null)

  const createtodoHandler =()=>{
    if (todoTitle!==" "){
      const newTodo ={
        id: Date.now(),
        title: todoTitle,
        iscomplete: false
      };
      // spread operator will keep the previous value of array
      settodoList([...todoList,newTodo]) 
      settodoTitle("")
    }else
    {
      alert("Enter item into todo list")
    }
  };

  // deleting element from todo list
  const deletetodoHandler =(id)=>{
    const newTodoList =todoList.filter((item)=>item.id!==id)
    settodoList(newTodoList)
  }

  const editTodoHandler= (id)=>{
    const tobeEdited = todoList.find((item)=>item.id===id)
    seteditMode(true)
    seteditableTodo(tobeEdited)
    settodoTitle(tobeEdited.title)
  }

  const updateTodohandler =()=>{
    settodoList(todoList.map((todo)=>{
      if (todo.id===editableTodo.id){
        todo.title=todoTitle
      }
      return todo
    }))
    seteditMode(false)
    settodoTitle("")
  }


  return (
    <div className="App">
      <div className='to-do'>
        <input type="text" value={todoTitle} onChange={(event)=> settodoTitle(event.target.value)} />
        <button onClick={()=>editMode ?updateTodohandler():createtodoHandler()}>{editMode ? "update Todo":"Add tasl"}</button>
        <ul className='todo-list'>
        {todoList.map(todo=>(
          <li>
            <span>{todo.title}</span>
            <button onClick={()=>editTodoHandler(todo.id)}>Edit</button>
            <button onClick={()=>deletetodoHandler(todo.id)}>Delete</button>
            </li>
        ))}
        
      </ul>
      </div>
      
      
    </div>
  );
}

export default App;
