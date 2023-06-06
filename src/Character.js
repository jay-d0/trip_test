import Guide from "./Guide";
import "./App.css";
import "./css/Character.css"

function Character(){
    return(
        <div className="many_guides">
            <Guide name="김은서" style = "여유롭게 여행을 즐기는 편" img_url= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Q82WISxpWPp5dHBTWHypFOZbRTvc0ST0xQ&usqp=CAU"></Guide>
            <Guide name="김재도" style = "쇼핑 위주의 여행" img_url= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Q82WISxpWPp5dHBTWHypFOZbRTvc0ST0xQ&usqp=CAU"></Guide>
            <Guide name="민성우" style = "맛집 위주로 여행" img_url= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Q82WISxpWPp5dHBTWHypFOZbRTvc0ST0xQ&usqp=CAU"></Guide>
            <Guide name="박유찬" style = "박물관, 유적지를 좋아하는 편" img_url= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Q82WISxpWPp5dHBTWHypFOZbRTvc0ST0xQ&usqp=CAU"></Guide>
            <Guide name="서우석" style = "현지인들과 어울리기를 좋아함." img_url= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Q82WISxpWPp5dHBTWHypFOZbRTvc0ST0xQ&usqp=CAU"></Guide>
        </div>
    )
}

export default Character;
