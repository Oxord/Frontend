import { PDFDocument, PDFPage, rgb } from 'pdf-lib'
import { getStateFromLocalStorage } from '../../store/getStateFromLocalStorage'
import style from './ToolBar.module.css'
import { SlideObject } from '../../store/types'
import fontkit from '@pdf-lib/fontkit'
import { getCirclePDF, getImagePDF, getReactanglePDF, getTextPDF, getTrianglePDF } from '../../store/ConvertObjectToPDF'
import { hexToRgb } from '../../store/hexToRgb'

const ExportTool = () => {
    const SLIDE_WIDTH = 950
    const SLIDE_HEIGHT = 525

    const compilePDFPage = (pdfDoc: PDFDocument, page: PDFPage, object: SlideObject) => {
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
                getTextPDF(pdfDoc, page, object)
                break
            case 'image':
                getImagePDF(pdfDoc, page, object)
        }
    }

    const stateLocal = getStateFromLocalStorage()

    const onExportToPDF = async () => {
        const pdfDoc = await PDFDocument.create()

        pdfDoc.registerFontkit(fontkit)

        stateLocal?.slides.forEach(slide => {
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
                });
            }
            slide.objects.forEach(object => {
                compilePDFPage(pdfDoc, page, object)
            })
        })

        const pdfBytes = await pdfDoc.save();
        
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a')
        link.href = url
        link.download = stateLocal? stateLocal.title + '.pdf' : 'presentation.pdf'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }

    return(
        <button onClick={onExportToPDF} className={style.toolBar__tool + ' ' + style.toolBar__tool_export}>Export</button>
    )
}

export{
    ExportTool
}