import React, {useState}from "react";

function Input() {
    const [text, setText] = useState("")
    const onChange = (e) => {
        setText(e.target.value);
    }
    return (
        <div>
            {text}
            <br/>
        <input onChange={onChange} value={text} />
        </div>
    )
}



export default Input;