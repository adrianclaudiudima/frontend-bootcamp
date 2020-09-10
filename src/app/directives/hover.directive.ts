import {Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output, Renderer2} from '@angular/core';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective {

  @HostBinding('class.hover-color')
  isHover = false;

  @Input()
  backgroundColor;

  @Input()
  borderRadius;

  @Output()
  backgroundColorChanged: EventEmitter<any> = new EventEmitter<any>();

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (this.backgroundColor) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'backgroundColor', this.backgroundColor);
    }
    this.backgroundColorChanged.emit({initial: true});
    this.renderer.addClass(this.elementRef.nativeElement, 'mat-elevation-z5');
    if (this.borderRadius) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'borderRadius', this.borderRadius);
    }
    this.isHover = true;
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.renderer.removeStyle(this.elementRef.nativeElement, 'backgroundColor');
    this.backgroundColorChanged.emit({initial: false});
    this.renderer.removeClass(this.elementRef.nativeElement, 'mat-elevation-z5');
    if (this.backgroundColor) {
      this.renderer.removeStyle(this.elementRef.nativeElement, 'backgroundColor', this.backgroundColor);
    }
    if (this.borderRadius) {
      this.renderer.removeStyle(this.elementRef.nativeElement, 'borderRadius');
    }
    this.isHover = false;
  }

}
