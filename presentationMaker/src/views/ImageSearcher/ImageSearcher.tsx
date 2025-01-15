import React, { useEffect, useState } from 'react'
import style from './ImageSearcher.module.css'
import { useAppActions } from '../../hooks/useAppActions'
import { getBase64Image } from '../../store/getBase64'

const UNSPLASH_ACCESS_KEY = 'yInoT3_rganJbCrJ1Dr8xyG5m2w2bst-lBQpqkdKQs8'

type ImageSearchProps = {
    selectedSlideId: string
    onClose: () => void
}

const ImageSearch = ({ selectedSlideId, onClose }: ImageSearchProps) => {
    const [images, setImages] = useState<string[]>([])
    const [query, setQuery] = useState('office')

    const { insertImage } = useAppActions()

    const fetchImages = async () => {
        try {
            const response = await fetch(`https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=${UNSPLASH_ACCESS_KEY}`)
            if (!response.ok) {
                throw new Error('Ошибка при загрузке изображений')
            }
            const data = await response.json()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setImages(data.results.map((img: any) => img.urls.small))
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            throw new Error 
        }
    }

    useEffect(() => {
        fetchImages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query])

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        fetchImages()
    }

    const handleImageClick = async (img: string) => {
        const base64 = await getBase64Image(img)
        insertImage(selectedSlideId, base64)
        onClose()
    }

    return (
        <>
            <form onSubmit={handleSearch}>
                <input type="text" value={query} className={style.form__input} onChange={(e) => setQuery(e.target.value)} placeholder="Поиск изображений" />
            </form>
            <div className={style.imageSearcher__images}>
                {images.map((img, index) => (
                    <img key={index} src={img} alt="Unsplash" onClick={() => handleImageClick(img)} className={style.image}/>
                ))}
            </div>
            <div className={style.form__button}>
                <button onClick={onClose}>
                    Close
                </button>

            </div>
        </>    
    )
}

export default ImageSearch
