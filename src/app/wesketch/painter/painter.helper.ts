import { Vector2 } from "../models/vector-2.model";

export class PainterHelper {
    movementBuffer: Array<Vector2> = new Array<Vector2>()

    getCoords(event, lineWidth): Vector2 {
        var coords = {
            x: 0,
            y: 0
        }

        if (event === undefined) {
            return coords
        }

        if (event.offsetX !== undefined) {
            coords.x = event.offsetX
            coords.y = event.offsetY
        } else {
            coords.x = event.layerX - event.currentTarget.offsetLeft
            coords.y = event.layerY - event.currentTarget.offsetTop
        }

        if (lineWidth > 0) {
            const brushOffset = Math.floor(lineWidth / 2)
            coords.x += brushOffset
            coords.y += brushOffset
        }

        return coords
    }

    // TODO: calculateDrawingDirection
    calculateDrawingDirection (coords) {
        if (this.movementBuffer.length === 10) {
            const removedItem = this.movementBuffer.shift()
        }
        this.movementBuffer.push({ x: coords.x, y: coords.y })

        const bufferLength = this.movementBuffer.length
        if (bufferLength === 10) {
            const xVelocity = Math.abs(this.movementBuffer[0].x - this.movementBuffer[bufferLength - 1].x)
            const yVelocity = Math.abs(this.movementBuffer[0].y - this.movementBuffer[bufferLength - 1].y)
            return xVelocity > yVelocity ? 'horizontal' : 'vertical'
        }

        return ''
    }
}