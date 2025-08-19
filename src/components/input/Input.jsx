import "./input.css";

const Input = ({setInputText, inputText}) => {
  return (
    <input value={inputText} className="input-comp" onChange={(e)=> setInputText(e.target.value)}/>
  )
}

export default Input