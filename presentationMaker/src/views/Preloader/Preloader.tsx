import { PopupCover } from '../../components/Popup/PopupCover';
import style from './Preloader.module.css'

// type PreloaderProps = {
//     // loading: boolean
// }

const Preloader = () => {
    return (
        <>
            <PopupCover isVisible={true}/>
            <div className={style.loader}>Loading...</div>
        </>
    )
}

export default Preloader;