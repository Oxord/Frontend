import { Palette } from "../Palette/Palette"

const PaletteBar = () => {
    const isPaletteVisible = false
    if (isPaletteVisible){
        return(
            <Palette isPaletteVisible={isPaletteVisible}/>
        )
    }
    else{
        return <></>
    } 
}

export {
    PaletteBar
}