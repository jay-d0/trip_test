import "./css/Guide.css"

function Guide({name, style, img_url}){
    return(
        <div className="one_guide">
        <img src = {img_url} alt= {name}></img>
        <p>{name}</p>
        <p>{style}</p>
        </div>
    )
}
export default Guide;