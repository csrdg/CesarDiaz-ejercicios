const RenderArray = ({elements}) => {
    const elementsList = []

    elements.forEach((element, index) => {
        elementsList.push(<li key={index}>{element}</li>)
    })

    /** se definen los props a usar por la función como elements, que en este caso será un array
     * se crea un array vacio para guardar los resultados de la iteración
     * se tiene que poner una key única a cada element child o salen cosas en console
     * se define que el contenido del array de resultados pusheados seran list items
     * se define en el return que esto nos va a dar un div con una lista desordenada que contendrá el array de pushes
    */

    return (
        <div>
            <ul>{elementsList}</ul>
            
        </div>
    )
}

export default RenderArray