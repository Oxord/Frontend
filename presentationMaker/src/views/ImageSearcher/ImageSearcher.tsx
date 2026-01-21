import React, { useEffect, useState } from 'react'
import style from './ImageSearcher.module.css'
import { useAppActions } from '../../hooks/useAppActions'
import { getBase64Image } from '../../store/getBase64'
import { SlideActionTypes } from '../../store/SlideActionTypes'

const UNSPLASH_ACCESS_KEY = 'yInoT3_rganJbCrJ1Dr8xyG5m2w2bst-lBQpqkdKQs8'

type ImageSearchProps = {
    selectedSlideId: string
    onClose: () => void
    actionType: SlideActionTypes.INSERT_IMAGE | SlideActionTypes.CHANGE_SLIDE_BACKGROUND 
}

const ImageSearch = ({ selectedSlideId, onClose, actionType }: ImageSearchProps) => {
    const [images, setImages] = useState<string[]>([])
    const [query, setQuery] = useState('image')

    const { insertImage, changeBackground } = useAppActions()

    const fetchImages = async () => {
        try {
            const response = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=${UNSPLASH_ACCESS_KEY}`)
            if (!response.ok) {
                throw new Error(`Ошибка HTTP: ${response.status}`)
            }
            const data = await response.json()
            setImages(data.results.map((img: any) => img.urls.small))
        } catch (err) {
            console.error("Ошибка загрузки:", err)
        }
    }

    useEffect(() => {
        fetchImages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        fetchImages()
    }

    const handleImageClick = async (img: string) => {
        const base64 = await getBase64Image(img)
        if (actionType === SlideActionTypes.CHANGE_SLIDE_BACKGROUND) {
            changeBackground(selectedSlideId, base64, 'src')
        }
        else {
            insertImage(selectedSlideId, base64)
        }
        onClose()
    }

    return (
        <>
            <form onSubmit={handleSearch}>
                <input type="text" value={query} className={style.form__input} onChange={(e) => setQuery(e.target.value)} placeholder="Search" />
            </form>
            <div className={style.imageSearcher__images}>
                {images.map((img, index) => (
                    <img key={index} src={img} alt="Unsplash" onClick={() => handleImageClick(img)} className={style.image}/>
                ))}
            </div>
            <div className={style.form__button_close} onClick={onClose}></div>
        </>    
    )
}

export default ImageSearch
