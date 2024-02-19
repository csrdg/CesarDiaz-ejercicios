
import './App.css'
import Anchor from './components/Anchor/Anchor'
import RenderArray from './components/RenderArray'
import Saludo from './components/Saludahora'
import ToggleButton from './components/ToggleButton/ToggleButton'
import { dataHome } from './data/data.home'

const App = () => {

  const arrayARecorrer = ["Renderizame","Renderizame!!","RENDERIZAME!!!!",]


  return (
    <>
     <div>
      <h4>Saludo dependiendo de la hora</h4>
      <Saludo /> 
      <h4> Array recorrida y pintada </h4>
      <RenderArray elements={arrayARecorrer}/>
      <h4> Toggle button </h4>
      <ToggleButton/>

    </div>
    <div>
    <h4> Objetos mapeados </h4>
      {dataHome.a.map((anchor) => (
        <Anchor
        key={anchor.href} 
       links={anchor.href}
       tar={anchor.target}
       source={anchor.img.src}
       alterna={anchor.img.alt}
       estilo={anchor.img.style}
       />
      ))}
    </div>
    </>
  )
}

export default App
