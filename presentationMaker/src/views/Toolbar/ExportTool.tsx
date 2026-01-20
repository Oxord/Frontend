import { PDFDocument, PDFPage, rgb } from 'pdf-lib'
import { getStateFromLocalStorage } from '../../store/getStateFromLocalStorage'
import style from './ToolBar.module.css'
import { SlideObject } from '../../store/types'
import fontkit from '@pdf-lib/fontkit'
import { getCirclePDF, getImagePDF, getReactanglePDF, getTextPDF, getTrianglePDF } from '../../store/ConvertObjectToPDF'
import { hexToRgb } from '../../store/hexToRgb'
import { drawPageGradientBackground } from '../../store/DrawPageGradientBackground'
import { useCallback } from 'react'
import { useAppSelector } from '../../hooks/useAppSelector';

type ExportToolProps = {
    onLoading: (value: boolean) => void
}

const ExportTool = ({onLoading}: ExportToolProps) => {
    const SLIDE_WIDTH = 950
    const SLIDE_HEIGHT = 525
    const title = useAppSelector(state => state.title)

    const compilePDFPage = async (pdfDoc: PDFDocument, page: PDFPage, object: SlideObject) => {
        switch (object.type){
            case 'rectangle':
                getReactanglePDF(page, object)
                break
            case 'circle':
                getCirclePDF(page, object)
                break
            case 'triangle':
                getTrianglePDF(page, object)
                break
            case 'text':
                await getTextPDF(pdfDoc, page, object)
                break
            case 'image':
                await getImagePDF(pdfDoc, page, object)
        }
    }

    const stateLocal = getStateFromLocalStorage()

    const onExportToPDF = async () => {
        const pdfDoc = await PDFDocument.create()

        pdfDoc.registerFontkit(fontkit)

        if (stateLocal) {
            for (const slide of stateLocal.slides) {
                const page = pdfDoc.addPage([SLIDE_WIDTH, SLIDE_HEIGHT])
                if (slide.background.type === 'solid') {
                    const { r, g, b } = hexToRgb(slide.background.color)
                    const backgroundColor = rgb(r, g, b)
                    page.drawRectangle({
                        x: 0,
                        y: 0,
                        width: page.getWidth(),
                        height: page.getHeight(),
                        color: backgroundColor,
                    })
                }
                if (slide.background.type === 'image') {
                    const base64Data = slide.background.src.split(',')[1]
                    const imageBytes = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0))
                    
                    const isPng = slide.background.src.startsWith('data:image/png');
                    const isJpg = slide.background.src.startsWith('data:image/jpeg');
                    let image
                    if (isPng) {
                        image = await pdfDoc.embedPng(imageBytes)
                    } else if (isJpg) {
                        image = await pdfDoc.embedJpg(imageBytes)
                    } else {
                        throw new Error('Unsupported image format. Please provide a PNG or JPEG image.')
                    }
                    page.drawImage(image, {
                        x: 0,
                        y: 0,
                        width: SLIDE_WIDTH,
                        height: SLIDE_HEIGHT,
                    })
                }
                if (slide.background.type === 'gradient') {
                    drawPageGradientBackground(page, slide.background)
                }
                for (const object of slide.objects) {
                    await compilePDFPage(pdfDoc, page, object) // Добавьте await здесь!
                }
            }
        }

        const pdfBytes = await pdfDoc.save()
        
        const blob = new Blob([pdfBytes], { type: 'application/pdf' })
        const url = URL.createObjectURL(blob)

        const link = document.createElement('a')
        link.href = url
        link.download = title ? title + '.pdf' : 'presentation.pdf'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    const onExport = useCallback(async () => {
        onLoading(true)
        
        try {
            await onExportToPDF()
        } catch (error) {
            console.error(error)
        } finally { 
            onLoading(false)
        }
    }, [onLoading, onExportToPDF])

    return(
        <button onClick={onExport} className={style.toolBar__tool + ' ' + style.toolBar__tool_export}>Export</button>
    )
}

export {
    ExportTool
}