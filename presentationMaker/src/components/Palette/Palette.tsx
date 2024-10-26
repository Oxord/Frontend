export type PaletteProps = {
    isPaletteVisible: boolean
}


const Palette = ({isPaletteVisible}: PaletteProps) => {
    const colors = ['red', 'blue', 'white', 'black']
    if(isPaletteVisible){
        return(
            <div>
                {colors.map(color => {
                    return(
                        <circle style={{color: color}}>
                            
                        </circle>
                    )
                })}    
            </div>
        )
    }
}

export{
    Palette
}