import "./css/Guide.css"
import { Link } from "react-router-dom";

function Guide({name, style, img_url}){
    return(
        <div className="one_guide">
        <Link to = "/Map">
        <img src = {img_url} alt= {name}></img>
        </Link>
        <p>{name}</p>
        <p>{style}</p>
        </div>
    )
}
export default Guide;