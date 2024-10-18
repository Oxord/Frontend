import { addSlide } from "../../store/actions"
import { Presentation } from "../../store/types"
import { Toolbar } from "../Toolbar/Toolbar"
type TopPanelProps = {
    pres: Presentation
}
const TopPanel = ({pres}: TopPanelProps) => {

    //fun add slide..

    return(
        <div>
            <input>Название презентации</input>{/*вынести в отлельный компонент*/}
            <Toolbar 
                pres={pres}
                onAddSlide={() => {}}
                onRemove={() => {console.log('removed')}}
            />
        </div>
    )
}

export{
    TopPanel
}