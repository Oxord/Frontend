import { PDFDocument, PDFPage, rgb } from "pdf-lib"
import { Circle, ImageObject, Rectangle, TextObject, Triangle } from "./types"
import { hexToRgb } from "./hexToRgb"

const SLIDE_HEIGHT = 525

export const getReactanglePDF = (page: PDFPage, rect: Rectangle) => {
    const { r, g, b } = hexToRgb(rect.color)
    page.moveTo(rect.position.X, SLIDE_HEIGHT - rect.position.Y - rect.height)
    page.drawRectangle({
        width: rect.width,
        height: rect.height,
        color: rgb(r, g, b)

    })
}

export const getCirclePDF = (page: PDFPage, circle: Circle) => {
    const { r, g, b } = hexToRgb(circle.color)
    page.moveTo(circle.position.X + circle.radius, SLIDE_HEIGHT - circle.position.Y - circle.height)
    page.drawCircle({
        size: circle.width,
        color: rgb(r, g, b)

    })
}

export const getTrianglePDF = (page: PDFPage, triangle: Triangle) => {
    const trianglePath = `M ${triangle.pointOne.X} ${triangle.pointOne.Y} L ${triangle.pointTwo.X} ${triangle.pointTwo.Y} L ${triangle.pointThree.X} ${triangle.pointThree.Y} Z`
    const { r, g, b } = hexToRgb(triangle.color)
    page.moveTo(triangle.position.X, SLIDE_HEIGHT - triangle.position.Y) //+ triangle.height)
    page.drawSvgPath(trianglePath, {
        color: rgb(r, g, b)
    })
}

export const getTextPDF = async (pdfDoc: PDFDocument, page: PDFPage, text: TextObject) => {
    // const fontBytes = await fetch(text.font).then(res => res.arrayBuffer()) //problem with шрифт    
    // const customFont = await pdfDoc.embedFont(fontBytes)
    const { r, g, b } = hexToRgb(text.color)
    page.moveTo(text.position.X, SLIDE_HEIGHT - text.position.Y - text.fontsize)
    page.drawText(text.text, {
        // font: customFont, //придумать парсер
        size: text.fontsize,
        color: rgb(r, g, b)
    })
}

export const getImagePDF = async (pdfDoc: PDFDocument, page: PDFPage, img: ImageObject) => {
    const base64Data = img.src.split(',')[1]
    const imageBytes = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0))
    
    const isPng = img.src.startsWith('data:image/png');
    const isJpg = img.src.startsWith('data:image/jpeg');
    let image
    if (isPng) {
        image = await pdfDoc.embedPng(imageBytes)
    } else if (isJpg) {
        image = await pdfDoc.embedJpg(imageBytes)
    } else {
        throw new Error('Unsupported image format. Please provide a PNG or JPEG image.')
    }
    page.moveTo(img.position.X, SLIDE_HEIGHT - img.position.Y - img.height)
    page.drawImage(image, {
        width: img.width,
        height: img.height,
    })
}

