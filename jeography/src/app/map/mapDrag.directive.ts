import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { repeat, switchMap, take, takeUntil} from 'rxjs/operators';

@Directive({
  selector: '[mapDrag]',
})
export class MapDragDirective implements OnInit {
  private element: HTMLElement;

  public dirty = false;
  public touched = false;

  public mouseOnCanvas = false;
  public mouseOnButton = false;
  public mouseEventCount = 0;

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
  ) {}

  ngOnInit(): void {
    this.element = this.elementRef.nativeElement as HTMLElement;
    let currentX = 0;
    let currentY = 0;
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
          currentX = currentX + event.movementX;
          currentY = currentY + event.movementY;
          this.element.style.transform = "translate3d(" + currentX + "px, " + currentY + "px, 0)";
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

  private checkMousePosition(event: MouseEvent): void {
    const element: HTMLElement = event.target as HTMLElement;
    this.mouseOnButton = this.checkOnControl(element);
    this.mouseOnCanvas = this.checkOnMap(element) && !this.checkOnControl(element);
  }
  
  private checkOnMap(element: HTMLElement): boolean {
    return element.className == "map-container" ? true : element.parentElement ? this.checkOnMap(element.parentElement) : false
  }

  private checkOnControl(element: HTMLElement): boolean {
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
}

