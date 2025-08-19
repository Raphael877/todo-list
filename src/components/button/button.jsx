import "./button.css";

const Button = ({style, action, children, id}) => {
  return (
    <button style={style} onClick={()=> action(id)}>{children}</button>
  )
}

export default Button