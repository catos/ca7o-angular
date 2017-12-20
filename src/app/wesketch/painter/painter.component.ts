import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core'
import { PainterHelper } from "./painter.helper";
import { Vector2 } from "./coords.model";

@Component({
    selector: 'ca7o-painter',
    templateUrl: './painter.component.html',
    styleUrls: ['./painter.component.css']
})
export class PainterComponent implements OnInit {
    @ViewChild('myCanvas') canvasRef: ElementRef;
    context: CanvasRenderingContext2D

    movementBuffer: Array<any>
    confirmOperation: boolean = false
    isDrawing: boolean = false
    drawingDirection: ''
    isShiftKeyDown: false
    canvas: {
        width: 0
        height: 0
    }

    // TODO: rename coords to something else
    coords: {
        prev: Vector2
        to: Vector2
    }

    // TODO: debug
    mousePosition: Vector2

    currentTool: 'brush'
    brushSize: 5
    foregroundColor: '#000000'
    backgroundColor: '#ffffff'
    colors: [
        { id: 'niggahs-black', name: 'Niggahs Black', hex: '#000000', isSelected: true },
        { id: 'titanium-white', name: 'Titanium White', hex: '#ffffff', isSelected: false },
        { id: 'phtalo-green', name: 'Phtalo Green', hex: '#123524', isSelected: false },
        { id: 'prussian-blue', name: 'Prussian Blue', hex: '#003153', isSelected: false },
        { id: 'van-dyke-brown', name: 'Van Dyke Brown', hex: '#584630', isSelected: false },
        { id: 'alizarin-crimson', name: 'Alizarin Crimson', hex: '#E32636', isSelected: false },
        { id: 'cadmium-yellow', name: 'Cadmium Yellow', hex: '#fff600', isSelected: false }
    ]    

    constructor(private helper: PainterHelper) { }

    ngOnInit() {
        this.context = this.canvasRef.nativeElement.getContext('2d')

        this.coords.prev = { x: -1, y: -1 }
        this.coords.to = { x: -1, y: -1 }
    }

    @HostListener('mousemove', ['$event'])
    mouseDown(event: MouseEvent) {
        this.context.strokeStyle = this.foregroundColor
        // if (event.which === 3) {
        //     this.context.strokeStyle = this.backgroundColor
        // }
        this.mousePosition = this.helper.getCoords(event, this.context.lineWidth)
        // if (this.currentTool === 'brush') {
            // this.context.beginPath()
            // this.isDrawing = true
            // this.coords.prev = coords
            // this.draw(this.coords.prev, this.coords.prev)
        // }
        // if (this.currentTool === 'fill') {
        //     this.fill(event)
        // }
    }

    mouseUp() {
        console.log('mouseUp')
    }

    mouseMove() {
        console.log('mouseMove')
    }

    mouseOut() {
        console.log('mouseOut')
    }

    draw(prev, to) {
        this.context.moveTo(prev.x, prev.y)
        this.context.lineTo(to.x, to.y)
        this.context.stroke()
    }
}
