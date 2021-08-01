import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { repeat, switchMap, take, takeUntil} from 'rxjs/operators';
import { MapComponent } from './map.component';

@Directive({
  selector: '[mapDrag]',
})
export class MapDragDirective implements OnInit {
  public element: HTMLElement;

  public dirty = false;
  public touched = false;

  public mouseOnCanvas = false;
  public mouseOnButton = false;
  public mouseEventCount = 0;

  public currentX = 0;
  public currentY = 0;

  private pointerDown: Subject<PointerEvent> = new Subject<PointerEvent>();
  private pointerMove: Subject<PointerEvent> = new Subject<PointerEvent>();
  private pointerUp: Subject<PointerEvent> = new Subject<PointerEvent>();
  
  @HostListener('document:pointerdown', ['$event'])
  public onPointerDown(event: PointerEvent): void {
    this.pointerDown.next(event);
  }

  @HostListener('document:pointermove', ['$event'])
  public onPointerMove(event: PointerEvent): void {
    this.pointerMove.next(event);
  }

  @HostListener('document:pointerup', ['$event'])
  public onPointerUp(event: PointerEvent): void {
    this.pointerUp.next(event);
  }

  constructor(
    private elementRef: ElementRef,
    private host: MapComponent
  ) {}

  ngOnInit(): void {
    this.element = this.elementRef.nativeElement as HTMLElement;
    
    /* Pointer Down Event */
    this.pointerDown.asObservable().subscribe((event) => {
      this.touched = true;
      this.checkMousePosition(event);
    });

    /* Pointer Move Event */
    this.pointerDown
      .pipe(
        switchMap(() => this.pointerMove),
        takeUntil(this.pointerUp),
        repeat()
      )
      .subscribe((event: PointerEvent) => {
        if (this.mouseOnCanvas) {
          this.mouseEventCount += Math.abs(event.movementX) + Math.abs(event.movementY);
          this.currentX = this.currentX + event.movementX / this.host.zoomLevel
          this.currentY = this.currentY + event.movementY / this.host.zoomLevel
          this.element.style.transform = "translate3d(" + this.currentX  + "px, " + this.currentY+ "px, 0)";
          this.dirty = true;
          
        }
    });

    /* Pointer Up Event */
    this.pointerDown
      .pipe(
        switchMap(() => this.pointerUp),
        take(1),
        repeat()
      )
      .subscribe(() => {
        this.touched = false;
        this.mouseEventCount = 0;

        setTimeout(() => {
          this.dirty = false;
        }, 100);
    });
  }

  public checkMousePosition(event: MouseEvent): void {
    const element: HTMLElement = event.target as HTMLElement;
    this.mouseOnButton = this.checkOnControl(element);
    this.mouseOnCanvas = this.checkOnMap(element) && !this.checkOnControl(element);
  }
  
  public checkOnMap(element: HTMLElement): boolean {
    return element.className == "map-container" ? true : element.parentElement ? this.checkOnMap(element.parentElement) : false
  }

  public checkOnControl(element: HTMLElement): boolean {
    // console.log('test here');
    switch ((element.nodeName || '').toUpperCase()) {
      case 'BUTTON':
        return true;
      case 'MAT-SLIDE-TOGGLE':
        return true;
      default:
        return element.parentElement ? this.checkOnControl(element.parentElement) : false;
    }
  }

  public resetView(): void {
    console.log('reset');
    this.currentX = 0;
    this.currentY = 0;
    this.element.style.transform = "translate3d(0px, 0px, 0)";
  }
}

