export const getBase64Image = (url: string) => {
    return new Promise<string>((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous'

        img.onload = () => {
            const canvas = document.createElement('canvas')
            canvas.width = img.width
            canvas.height = img.height
            const ctx = canvas.getContext('2d')
            if (ctx) {
                ctx.drawImage(img, 0, 0)
                const dataURL = canvas.toDataURL('image/png') // другой формат
                resolve(dataURL)
            } else {
                reject('Не удалось получить контекст канваса')
            }
        };

        img.onerror = (err) => {
            reject(err)
        }

        img.src = url
    })
}