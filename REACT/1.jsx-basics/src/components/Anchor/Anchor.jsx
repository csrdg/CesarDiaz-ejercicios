const Anchor = (props) => {
    const {
        links,
        tar,
        source,
        alterna,
        estilo,
    } = props

    return (
        <a href={links} target={tar}>
            <img src={source} alt={alterna} style={estilo}/>
        </a>
    )
}

export default Anchor