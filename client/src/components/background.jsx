
function Background () {

const style = {
    zIndex: -5, 
    backgroundImage: `URL(../images/pexels-philippedonn-1169754.jpg)`,
    position: 'absolute',
    top: '0%',
    right: '0%',
    left: '0%',
    bottom: '0%',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    opacity: '60%'
}

    return <div style= {style}></div>
}

export default Background; 