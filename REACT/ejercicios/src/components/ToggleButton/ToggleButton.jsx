import { useState } from "react"

const ToggleButton = () => {
    const [value, setValue] = useState(false)

    const toggleValue = () => {
        setValue(!value)
    }

    /** este toggle cambiará el valor de setValue siempre a su contrario.
     * su volar se marca inicialmente como false
     * se define un evento para que la función se lance al clicar el botón*/ 

    return (
        <div>
            <button onClick={toggleValue}>CHANGE THE VALUE!!</button>
            {value && <p>Changed value...</p>}
        </div>
    )
}

export default ToggleButton