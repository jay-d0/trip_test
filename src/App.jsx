import communicate from "./communicate";
import { useState, useEffect } from 'react';

function App() {
  const [test, setTest] = useState("Not yet")
  const price = "usual"
  const [text, setText] = useState("")
  const [wtext, setWtext] = useState("")
  const [hotels, setHotels] = useState([])
  const [places, setPlaces] = useState([])
  const [what, setWhat] = useState("")

  const callApi = async() => {
    communicate.post('/').then((res) => {
      setTest(res.data.Hello);      
    });
  };

  useEffect(() => {
    callApi();
  }, [])

  return (
    <>
      <h1>뭐부터 하고 싶나요</h1>
      <form
        onSubmit={(e)=>{
          communicate.post("/what",
            {A:wtext}
            ).then((res) => {
              console.log(res.data)
              setWhat(res.data.what);
          })
          
          e.preventDefault()
        }}
      >
        <input
          value={wtext}
          onChange={(e) => setWtext(e.target.value)}
        />
      </form>
      <ul>
        {what ? <li>{what}</li> : <div></div>}
      </ul>
      

      <h1>{test}</h1>

      <form
        onSubmit={(e)=>{
          communicate.post('/hotel',
            {A:text,
              pers_price:price,
              pers_aspect:"cleanness,kindness,traffic"}
            ).then((res) => {
              setHotels(res.data);
          })
          e.preventDefault()
        }}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </form>
      <ul>
        {
          ( hotels ? (
            hotels.map((ho) => {
              return (
                <div key={ho["title"]}>
                  <li> { ho["title"] } </li>
                  <ul>
                    {Object.keys(ho["aspects"]).map((aspect)=> {
                      return(
                        <li key={aspect}>{aspect} : {ho["aspects"][aspect]}</li>
                      )
                    })}
                  </ul>
                </div>
              )
            }))
          : (<li></li>))
        }
      </ul>

      <h1>Place Test</h1>
      <form
        onSubmit={(e)=>{
          communicate.post("/place",
            {pers_far: "Famous",
              lat: 48.8083701,
              lng: 2.2922926}
            ).then((res) => {
              setPlaces(res.data);
          })
          e.preventDefault()
        }}
      >
        <button>위치 기반 관광지 추천</button>
      </form>
      <ul>
        {
          ( places ? (
            places.map((pl) => {
              return (
                <li key={pl["title"]}> { pl["title"] } (loc: { pl["lat"] },{ pl["lng"] })
                , key: {pl["key"]}</li>
              )
            }))
          : (<li></li>))
        }
      </ul>

    </>
  )
}

export default App
