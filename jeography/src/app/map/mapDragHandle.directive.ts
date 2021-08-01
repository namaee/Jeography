import { Directive, ElementRef } from "@angular/core";

@Directive({
  selector: "[mapDragHandle]",
})
export class MapDragHandle {
  constructor(public elementRef: ElementRef<HTMLElement>) {}
}