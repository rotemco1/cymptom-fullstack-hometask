import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appFocused]'
})
export class FocusedDirective {

  @Input()
  set appFocused(value: boolean) {
    if (value) {
      this.elementRef.nativeElement.focus();
    }
  }

  constructor(private readonly elementRef: ElementRef) { }
}
