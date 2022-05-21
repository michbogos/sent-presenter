import { useState } from 'react';
import './App.css'
function App() {

  const [isPresenting, setIsPresenting] = useState(false)
  const [slide, setSlide] = useState(1)
  const [presentation, setPresentation] = useState([<h1>ERROR</h1>])

  document.onkeydown = (e)=>{
    if(e.code === "ArrowLeft"){
      setSlide(Math.max(slide-1, 0))
    }
    if(e.code === "ArrowRight"){
      setSlide(Math.min(slide+1), presentation.length)
    }
    if(e.code === "KeyQ"){
      setSlide(0)
      setIsPresenting(false)
    }
  }

  let start = () => {
    let files = document.getElementById("input").files;
    let images = []
  
    for (let i = 0; i < files.length; i++)
    {
      if(files[i].type === ("image/png" || "image/jpg")){
        images.push(files[i])
      }
      if(files[i].type === "text/plain"){
        files[i].text().then((res)=>{make_presentation(res.split("\n"), images, 0)})
      }
    }
  }

  let make_presentation = (instructions, images) =>{
    let slides = []
    let img_names = images.map((img)=>{return img.name})
    let children = []
    for(let i = 0; i < instructions.length; i++){
      if(instructions[i][0] === "@"){
        slides.push(<img src = {URL.createObjectURL(images[img_names.indexOf(instructions[i].substring(1, instructions[i].length))])} />)
      }
      else if(instructions[i] === ""){
        slides.push(<div>{children}</div>)
        children = []
      }
      else{
        children.push(<p>{instructions[i]}</p>)
      }
    }
    setPresentation(slides)
    setIsPresenting(true)
  }
  if(!isPresenting){
    return (
      <div className="App">
        <h1>Sent presenter</h1>
        <form>
          <input id = "input" type="file" multiple="multiple"></input>
        </form>
        <button id = "start" onClick={start}>Start presentation</button>
      </div>
    )
  }
  else{
    return presentation[slide]
  }
}

export default App;
