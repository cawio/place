import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @ViewChild('myCanvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement> | undefined;
  context: CanvasRenderingContext2D | null = null;

  private canvasBackup: HTMLCanvasElement | undefined;
  private contextBackup: CanvasRenderingContext2D | null = null;

  readonly MAX_ZOOM = 10;
  readonly MIN_ZOOM = 1;

  scale: number = 1;
  scaleOffset: Size = { x: 0, y: 0 };
  panOffset: Size = { x: 1, y: 1 };

  contentObjArray: { x: number; y: number; color: string }[] = []; // Your matrix here
  hoveredCell: { x: number; y: number } | null = null;

  ngAfterViewInit() {
    if (!this.canvas) {
      return;
    }

    // init backup
    this.canvasBackup = document.createElement('canvas');
    this.canvasBackup.width = this.canvas.nativeElement.width;
    this.canvasBackup.height = this.canvas.nativeElement.height;
    this.contextBackup = this.canvasBackup.getContext('2d');

    // init orginal
    this.context = this.canvas.nativeElement.getContext('2d');

    let scaledWidth = this.canvas.nativeElement.width * this.scale;
    let scaledHeight = this.canvas.nativeElement.height * this.scale;

    let scaledOffsetX = (scaledWidth - this.canvas.nativeElement.width) / 2;
    let scaledOffsetY = (scaledHeight - this.canvas.nativeElement.height) / 2;

    this.scaleOffset = { x: scaledOffsetX, y: scaledOffsetY };

    this.canvas.nativeElement.width = scaledWidth;
    this.canvas.nativeElement.height = scaledHeight;

    // this.context?.clearRect(0, 0, scaledWidth, scaledWidth);
    this.context?.save();
    this.context?.fillRect(100, 100, 50, 50);
    this.context?.scale(this.scale, this.scale);
    this.context?.fillRect(100, 300, 50, 50);
  }

  onZoom(event: WheelEvent) {
    if (event.ctrlKey && this.context) {
      event.preventDefault();

      if (this.contextBackup && this.canvas) {
        this.contextBackup.drawImage(this.canvas.nativeElement, 0, 0);
      }

      const delta = event.deltaY * -1;
      const zoomSpeed = 0.01;
      // this.zoomLevel += delta * zoomSpeed;
      // this.zoomLevel = Math.round(
      //   Math.min(Math.max(this.MIN_ZOOM, this.zoomLevel), this.MAX_ZOOM)
      // );
      let prevScale = this.scale;
      let prevPanOffset = this.panOffset;

      this.scale += delta * zoomSpeed;
      this.scale = Math.round(
        Math.min(
          Math.max(this.scale + delta * zoomSpeed, this.MIN_ZOOM),
          this.MAX_ZOOM
        )
      );

      this.panOffset = {
        x: this.panOffset.x - event.deltaX,
        y: this.panOffset.y - event.deltaY,
      };

      console.log(this.scale);
      if (!this.canvas) {
        return;
      }
      this.context.translate(this.panOffset.x, this.panOffset.y);
      this.context.scale(this.scale, this.scale);

      let scaledWidth =
        (this.canvas.nativeElement.width / prevScale) * this.scale;
      let scaledHeight =
        (this.canvas.nativeElement.height / prevScale) * this.scale;

      let scaledOffsetX = (scaledWidth - this.canvas.nativeElement.width) / 2;
      let scaledOffsetY = (scaledHeight - this.canvas.nativeElement.height) / 2;

      this.scaleOffset = { x: scaledOffsetX, y: scaledOffsetY };

      // this.canvas.nativeElement.width = scaledWidth;
      // this.canvas.nativeElement.height = scaledHeight;
    }
    this.redrawCanvas();
  }

  redrawCanvas() {
    if (!this.context || !this.canvas || !this.canvasBackup) {
      return;
    }
    this.context.clearRect(
      0,
      0,
      this.canvas.nativeElement.width,
      this.canvas.nativeElement.height
    );
    console.log(this.contentObjArray);
    this.contentObjArray.forEach((obj) => {
      this.context?.fillRect(
        obj.x - 10,
        obj.y - 10,
        1 * this.scale,
        1 * this.scale
      ); // Draw a 10x10 pixel rectangle at (x, y) with highlight color
      // console.log('1');
    });
  }

  onZoom1(delta: number) {
    if (this.context) {
      const zoomSpeed = 0.01;
      // this.zoomLevel += delta * zoomSpeed;
      // this.zoomLevel = Math.round(
      //   Math.min(Math.max(this.MIN_ZOOM, this.zoomLevel), this.MAX_ZOOM)
      // );
      this.scale += delta * zoomSpeed;
      this.scale = Math.round(
        Math.min(
          Math.max(this.scale + delta * zoomSpeed, this.MIN_ZOOM),
          this.MAX_ZOOM
        )
      );

      this.panOffset = {
        x: this.panOffset.x - delta,
        y: this.panOffset.y - delta,
      };
      console.log(this.scale);
      if (!this.canvas) {
        return;
      }
      this.context.translate(this.panOffset.x, this.panOffset.y);
      this.context.scale(this.scale, this.scale);
    }
  }

  draw(event: MouseEvent) {
    if (!this.canvas) {
      return;
    }
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    const x = event.clientX - this.canvas.nativeElement.offsetLeft;
    const y = event.clientY - this.canvas.nativeElement.offsetTop;

    // Calculate cell coordinates from mouse coordinates
    const cellX = Math.floor(x);
    const cellY = Math.floor(y);

    console.log(x, cellX, y, cellY);
    if (this.context) {
      this.context.fillRect(
        cellX - 10,
        cellY - 10,
        1 * this.scale,
        1 * this.scale
      ); // Draw a 10x10 pixel rectangle at (x, y) with highlight color
      // console.log('1');
      this.context.fillStyle = 'rgba(255, 0, 0, 0.5)'; // Highlight color
    }

    this.contentObjArray.push({ x: cellX, y: cellY, color: 'red' });
  }
}
export type Size = {
  x: number;
  y: number;
};

export type Position = Size;
