import style from './Preloader.module.css'

const Preloader = () => {
    return (
        <div className={style.overlay}>
            <div className={style.loader}></div>
            <div className={style.text}>Exporting PDF...</div>
        </div>
    )
}

export default Preloader