import Guide from "./Guide";
import "./App.css";
import "./css/Character.css"

function Character(){
    return(
        <div className="many_guides">
            <Guide name="A" style = "Fast" img_url= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Q82WISxpWPp5dHBTWHypFOZbRTvc0ST0xQ&usqp=CAU"></Guide>
            <Guide name="B" style = "Fast" img_url= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Q82WISxpWPp5dHBTWHypFOZbRTvc0ST0xQ&usqp=CAU"></Guide>
            <Guide name="C" style = "Fast" img_url= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Q82WISxpWPp5dHBTWHypFOZbRTvc0ST0xQ&usqp=CAU"></Guide>
        </div>
    )
}

export default Character;