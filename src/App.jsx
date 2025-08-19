import './App.css'
import Button from './components/button/button'
import Input from './components/input/Input'
import TodoItems from './components/todo-items/todo-items'
import { useState } from 'react'

function App() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState("");

  
  const addTodos = () => {
    if (inputText.trim() === "") return;
    setTodos((e) => [
      ...e,
      { id: todos.length + 1, text: inputText, onEdit: false },
    ]);
    setInputText("");
  } 

  const editTodos=(id, text)=>{
    const editedTodos = todos.map((e)=>{
      if(id === e.id){
        e.text = text
        return e
      }else{
        return e
      }
    })
    setTodos(editedTodos)
  }

  const onSave=(id)=>{
    const savedTodos = todos.map((e)=>{
      if(id === e.id){
        e.onEdit = false
        return e
      }else{
        return e
      }
    })
    setTodos(savedTodos)
  }
  
  const toEdit=(id)=>{
      const edtingMode = todos.map((e)=>{
        if(id === e.id){
          e.onEdit = true
          return e
        }else{
          return e
        }
      })
      setTodos(edtingMode)
  }

  const onDelete=(id)=>{
    const deletingMode = todos.filter((e) =>{
      if(id !== e.id){
        return e
      }
    })
    setTodos(deletingMode)
  }

  return (
    <>
      <div className='todo-app'>
        
        <h3>To-Do List</h3>
        <div className='todo-form'>
          <Input setInputText={setInputText} inputText={inputText}/>
          <Button style={{backgroundColor: "#2c666e",
              color: "white",
              border: "1px solid ",
              paddingBlock: 10,
              paddingInline: 20,
              cursor: "pointer"}}
               action={addTodos}>Add</Button>
        </div>
        <div className='todo-list-holder'>
          {
            todos.map((e)=>(
              <TodoItems key={e.id} info={e} toEdit={toEdit} editTodos={editTodos} onSave={onSave} onDelete={onDelete}/>
            ))
          }
        </div>
       </div> 
    </>
  )
}

export default App
