import './App.css'
import Button from './components/button/button'
import Input from './components/input/Input'
import TodoItems from './components/todo-items/todo-items'
import { useReducer, useState } from 'react'

const initialState = [];

function todoReducer(state, action) {
  if (action.type === 'ADD') {
    if (action.payload.text.trim() === "") return state;
    return [
      ...state,
      {
        id: state.length + 1,
        text: action.payload.text,
        onEdit: false,
        completed: false,
      },
    ];
  }

  if (action.type === 'EDIT') {
    return state.map(todo =>
      todo.id === action.payload.id
        ? { ...todo, text: action.payload.text }
        : todo
    );
  }

  if (action.type === 'SAVE') {
    return state.map(todo =>
      todo.id === action.payload.id
        ? { ...todo, onEdit: false }
        : todo
    );
  }

  if (action.type === 'TO_EDIT') {
    return state.map(todo =>
      todo.id === action.payload.id
        ? { ...todo, onEdit: true }
        : todo
    );
  }

  if (action.type === 'DELETE') {
    return state.filter(todo => todo.id !== action.payload.id);
  }

  if (action.type === 'TOGGLE_COMPLETE') {
    return state.map(todo =>
      todo.id === action.payload.id
        ? { ...todo, completed: !todo.completed }
        : todo
    );
  }

  return state;
}

function App() {
  const [todos, dispatch] = useReducer(todoReducer, initialState);
  const [inputText, setInputText] = useState("");

  const addTodos = () => {
    dispatch({ type: 'ADD', payload: { text: inputText } });
    setInputText("");
  };

  const editTodos = (id, text) => {
    dispatch({ type: 'EDIT', payload: { id, text } });
  };

  const onSave = (id) => {
    dispatch({ type: 'SAVE', payload: { id } });
    alert("Saved");
  };

  const toEdit = (id) => {
    dispatch({ type: 'TO_EDIT', payload: { id } });
  };

  const onDelete = (id) => {
    dispatch({ type: 'DELETE', payload: { id } });
    alert("Task deleted");
  };

  const toggleComplete = (id) => {
    dispatch({ type: 'TOGGLE_COMPLETE', payload: { id } });
  };

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <div className='alltodo' style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
      <div className='todo-app' style={{ flex: 1 }}>
        <h3>To-Do List</h3>
        <div className='todo-form'>
          <Input setInputText={setInputText} inputText={inputText}/>
          <Button style={{
              backgroundColor: "#2c666e",
              color: "white",
              border: "1px solid ",
              paddingBlock: 10,
              paddingInline: 20,
              cursor: "pointer"
            }}
            action={addTodos}>Add</Button>
        </div>
        <div className='todo-list-holder'>
          {
            activeTodos.map((e) => (
              <TodoItems
                key={e.id}
                info={e}
                toEdit={toEdit}
                editTodos={editTodos}
                onSave={onSave}
                onDelete={onDelete}
                toggleComplete={toggleComplete}
              />
            ))
          }
        </div>
      </div>
      <div className='todo-app'>
        <h3>Completed Tasks</h3>
        <div className='todo-list-holder' style={{ minHeight: 450}}>
          {
            completedTodos.map((e) => (
              <TodoItems
                key={e.id}
                info={e}
                toEdit={toEdit}
                editTodos={editTodos}
                onSave={onSave}
                onDelete={onDelete}
                toggleComplete={toggleComplete}
              />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default App