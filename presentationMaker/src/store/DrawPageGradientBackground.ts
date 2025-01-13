import { PDFPage, rgb } from "pdf-lib"
import { hexToRgb } from "./hexToRgb"
import { GradientBackground } from "./types"

export const drawPageGradientBackground = (page: PDFPage, back: GradientBackground) => {
    const startColor = hexToRgb(back.color1) 
    const endColor = hexToRgb(back.color2)
    let steps = 10000
    const stepWidth = page.getWidth() / steps
    const stepHeight = page.getHeight() / steps
    console.log(back.gradientType)
    switch (back.gradientType) {
        case 'right': {
            for (let i = 0; i < steps; i++) {
                const ratio = i / (steps - 1)
                const color = rgb(
                    startColor.r + ratio * (endColor.r - startColor.r),
                    startColor.g + ratio * (endColor.g - startColor.g),
                    startColor.b + ratio * (endColor.b - startColor.b)
                )
                page.drawRectangle({
                  x: stepWidth * i,
                  y: 0,
                  width: stepWidth,
                  height: page.getHeight(),
                  color: color,
                })
            }
            break
        }
        case 'left': {
            for (let i = 0; i < steps; i++) {
                const ratio = i / (steps - 1)
                const color = rgb(
                    endColor.r + ratio * (startColor.r - endColor.r),
                    endColor.g + ratio * (startColor.g - endColor.g),
                    endColor.b + ratio * (startColor.b - endColor.b)
                )
                page.drawRectangle({
                  x: stepWidth * i,
                  y: 0,
                  width: stepWidth,
                  height: page.getHeight(),
                  color: color,
                })
            }
            break
        }
        case 'top': {
            for (let i = 0; i < steps; i++) {
                const ratio = i / (steps - 1);
                const color = rgb(
                  startColor.r + ratio * (endColor.r - startColor.r),
                  startColor.g + ratio * (endColor.g - startColor.g),
                  startColor.b + ratio * (endColor.b - startColor.b)
                );
            
                page.drawRectangle({
                  x: 0,
                  y: stepHeight * i,
                  width: page.getWidth(),
                  height: stepHeight,
                  color: color,
                });
              }
              break
        }
        case 'bottom': {
            for (let i = 0; i < steps; i++) {
                const ratio = i / (steps - 1);
                const color = rgb(
                    endColor.r + ratio * (startColor.r - endColor.r),
                    endColor.g + ratio * (startColor.g - endColor.g),
                    endColor.b + ratio * (startColor.b - endColor.b)
                );
            
                page.drawRectangle({
                  x: 0,
                  y: stepHeight * i,
                  width: page.getWidth(),
                  height: stepHeight,
                  color: color,
                });
              }
              break
        }
        case 'top right': {
            steps = 500
            for (let i = 0; i < steps; i++) {
                for (let j = 0; j < steps; j++) {
                  const ratioX = i / (steps - 1)
                  const ratioY = j / (steps - 1)

                  const r = startColor.r * (1 - ratioX) * (1 - ratioY) + endColor.r * ratioX * ratioY
                  const g = startColor.g * (1 - ratioX) * (1 - ratioY) + endColor.g * ratioX * ratioY
                  const b = startColor.b * (1 - ratioX) * (1 - ratioY) + endColor.b * ratioX * ratioY
            
                  const color = rgb(r, g, b);
            
                  const rectWidth = page.getWidth() / steps
                  const rectHeight = page.getHeight() / steps
            
                  page.drawRectangle({
                    x: rectWidth * i,
                    y: rectHeight * j,
                    width: rectWidth,
                    height: rectHeight,
                    color: color,
                  });
                }
            }
            break  
        }
        case 'top left': {
            steps = 500
            for (let j = 0; j < steps; j++) {
                for (let i = 0; i < steps; i++) {
                  const ratioX = i / (steps - 1)
                  const ratioY = j / (steps - 1)

                  const r = endColor.r * (1 - ratioX) * ratioY + startColor.r * ratioX * (1 - ratioY)
                  const g = endColor.g * (1 - ratioX) * ratioY + startColor.g * ratioX * (1 - ratioY)
                  const b = endColor.b * (1 - ratioX) * ratioY + startColor.b * ratioX * (1 - ratioY)
            
                  const color = rgb(r, g, b);
            
                  const rectWidth = page.getWidth() / steps
                  const rectHeight = page.getHeight() / steps
            
                  page.drawRectangle({
                    x: rectWidth * i,
                    y: rectHeight * j,
                    width: rectWidth,
                    height: rectHeight,
                    color: color,
                  });
                }
            }
            break  
        }
        case 'bottom right': {
            steps = 500
            for (let j = 0; j < steps; j++) {
                for (let i = 0; i < steps; i++) {
                  const ratioX = i / (steps - 1)
                  const ratioY = j / (steps - 1)

                  const r = startColor.r * (1 - ratioX) * ratioY + endColor.r * ratioX * (1 - ratioY)
                  const g = startColor.g * (1 - ratioX) * ratioY + endColor.g * ratioX * (1 - ratioY)
                  const b = startColor.b * (1 - ratioX) * ratioY + endColor.b * ratioX * (1 - ratioY)
            
                  const color = rgb(r, g, b);
            
                  const rectWidth = page.getWidth() / steps
                  const rectHeight = page.getHeight() / steps
            
                  page.drawRectangle({
                    x: rectWidth * i,
                    y: rectHeight * j,
                    width: rectWidth,
                    height: rectHeight,
                    color: color,
                  });
                }
            }
            break
        }
        case 'bottom left': {
            steps = 500
            for (let j = 0; j < steps; j++) {
                for (let i = 0; i < steps; i++) {
                  const ratioX = i / (steps - 1)
                  const ratioY = j / (steps - 1)

                  const r = startColor.r * ratioX * ratioY + endColor.r * (1 - ratioX) * (1 - ratioY)
                  const g = startColor.g * ratioX * ratioY + endColor.g * (1 - ratioX) * (1 - ratioY)
                  const b = startColor.b * ratioX * ratioY + endColor.b * (1 - ratioX) * (1 - ratioY)
            
                  const color = rgb(r, g, b);
            
                  const rectWidth = page.getWidth() / steps
                  const rectHeight = page.getHeight() / steps
            
                  page.drawRectangle({
                    x: rectWidth * i,
                    y: rectHeight * j,
                    width: rectWidth,
                    height: rectHeight,
                    color: color,
                  });
                }
            }
            break
        }
    }
    
}