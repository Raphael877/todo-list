import "./todo-items.css";
import Button from '../button/button';

const TodoItems = ({info, toEdit, editTodos, onSave, onDelete}) => {
  return (
    <div className='todo-items'>
      <div className="checkinp">
      <input type='checkbox' className="checkbox"/>
      {info.onEdit? <input value={info.text} onChange={(e)=> editTodos(info.id, e.target.value) }/>:<p>{info.text}</p> }
      </div>
        <div className="todo-items-buttons">
        <Button style={{backgroundColor: "tomato",
              color: "white",
              border: "none",
              paddingBlock: 10,
              paddingInline: 10,  
              borderRadius: 4,
              cursor: "pointer"}} action={() => onDelete(info.id)}>Delete</Button>
        <Button style={{backgroundColor: "#2c666e",
              color: "white",
              border: "none",
              paddingBlock: 10,
              paddingInline: 10,
              borderRadius: 4,
              cursor: "pointer"}} action={info.onEdit? onSave:toEdit} id={info.id}>{info.onEdit? "Save": "Edit"}</Button>
        </div>
     </div> 
  )
}

export default TodoItems