import { PDFDocument, PDFPage, rgb } from "pdf-lib"
import { Circle, ImageObject, Rectangle, TextObject, Triangle } from "./types"
import { hexToRgb } from "./hexToRgb"
import fontkit from '@pdf-lib/fontkit'
import { fontUrls } from "./fontUrls"

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
    const fontName = text.font || 'Arial'
    const fontUrl = fontUrls[fontName] || fontUrls['default']
    const defaultFontUrl = fontUrls['default']

    let fontBytes;

    try {
        fontBytes = await fetch(fontUrl).then((res) => {
            if (!res.ok) throw new Error('Network response was not ok')
            return res.arrayBuffer();
        })
    } catch (e) {
        console.warn(`Не удалось загрузить шрифт ${fontName}, используем дефолтный:`, e)
        try {
            fontBytes = await fetch(defaultFontUrl).then((res) => res.arrayBuffer())
        } catch (err) {
            console.error('Не удалось загрузить даже дефолтный шрифт', err)
            return
        }
    }

    try {
        pdfDoc.registerFontkit(fontkit)
        const customFont = await pdfDoc.embedFont(fontBytes)
        const { r, g, b } = hexToRgb(text.color)

        page.drawText(text.text, {
            x: text.position.X,
            y: SLIDE_HEIGHT - text.position.Y - text.fontsize,
            font: customFont,
            size: text.fontsize,
            color: rgb(r, g, b)
        })
    } catch (e) {
        console.error('Ошибка при отрисовке текста:', e)
    }
}

export const getImagePDF = async (pdfDoc: PDFDocument, page: PDFPage, img: ImageObject) => {
    const imageBytes = await fetch(img.src, { 
        mode: 'cors',
        cache: 'no-cache'
    }).then((res) => {
        if (!res.ok) throw new Error("Failed to fetch image");
        return res.arrayBuffer();
    });
    
    let image;
    try {
        image = await pdfDoc.embedPng(imageBytes);
    } catch {
        image = await pdfDoc.embedJpg(imageBytes);
    }

    page.drawImage(image, {
        x: img.position.X,
        y: SLIDE_HEIGHT - img.position.Y - img.height,
        width: img.width,
        height: img.height,
    });
}

