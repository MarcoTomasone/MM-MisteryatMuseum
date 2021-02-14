const e = React.createElement;

function Card(props){
    const [background, setBackground] = React.useState(`../../server/upload/${props.background}`)

    const press = () =>{
        props.setStorySelected(props.id)
        props.other.forEach((element) => {
            var c = document.getElementById(element.id).children;
            if(props.id == element.id) c[0].style.opacity = 1
            else c[0].style.opacity = 0.65
        })
    }

    function getAverageColor(imageElement, ratio) {
        const canvas = document.createElement("canvas")
        let height = canvas.height = imageElement.naturalHeight
        let width = canvas.width = imageElement.naturalWidth
        const context = canvas.getContext("2d")
        context.drawImage(imageElement, 0, 0)
        let data, length
        let i = -4, count = 0
        try {
            data = context.getImageData(0, 0, width, height)
            length = data.data.length
        } catch (err) {
            console.error(err)
            return { R: 0, G: 0, B: 0}
        }
        let R, G, B
        R = G = B = 0
        while ((i += ratio * 4) < length) {
            ++count
            R += data.data[i]
            G += data.data[i + 1]
            B += data.data[i + 2]
        }
        R = ~~(R / count)
        G = ~~(G / count)
        B = ~~(B / count)
        return {R, G, B}
    }

    const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')

    function lightOrDark(color) {
        var r, g, b, hsp;
            if (color.match(/^rgb/)) {
            color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);  
            r = color[1];
            g = color[2];
            b = color[3];
        } 
        else {
            color = +("0x" + color.slice(1).replace( 
            color.length < 5 && /./g, '$&$&'));
            r = color >> 16;
            g = color >> 8 & 255;
            b = color & 255;
        }
        hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
        if (hsp>127.5) return 'light';
        else return 'dark';
    }
      
    React.useEffect(() => {
        if (props.background == "") setBackground("")
        const image = document.getElementById(`${props.id}_card`)
        image.onload = () => {
            const { R, G, B } = getAverageColor(image, 4)
            if (lightOrDark(rgbToHex(R, G, B)) == 'dark') document.getElementById(props.id).style.color = "white"
            else document.getElementById(props.id).style.color = "black"
        }
        var child = document.getElementById(`${props.id}_content`).childNodes
        child.forEach(element => element.style.fontFamily = props.fontFamily)
    }, [])
    
    return e("div", {id: props.id, className: "card", onClick: press}, [
        e("img", {id: `${props.id}_card`, className: "card_backrgound", src: background}),
        e("div", {id: `${props.id}_content`, className: `card_content`}, [
            e("div", {className: "card_title"}, props.title),
            e("div", {className: "card_gender"}, props.gender),
            e("div", {className: "card_objective"}, props.objective),
            e("div", {className: "card_info"}, [
                e("div", {className: "card_participant"}, [
                    e("img", {src: props.participantsType})
                ]),
                e("div", {className: "card_accessibility"}, [
                    e("img", {src: props.accessibility})
                ]),
            ]),
            e("div", {className: "card_age"}, `${props.age[0]} - ${props.age[1]}`),
            e("div", {className: "card_description"}, props.description)
        ])
    ])
}

export default Card;