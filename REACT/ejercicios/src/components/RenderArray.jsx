const RenderArray = ({elements}) => {
    const elementsList = []

    elements.forEach((element, index) => {
        elementsList.push(<li key={index}>{element}</li>)
    })

    return (
        <div>
            <ul>{elementsList}</ul>
            
        </div>
    )
}

export default RenderArray