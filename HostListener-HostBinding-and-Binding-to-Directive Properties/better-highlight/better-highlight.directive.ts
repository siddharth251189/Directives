import {
  OnInit,
  Directive,
  Renderer2,
  ElementRef,
  HostListener,
  HostBinding,
  Input
} from '@angular/core';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit {
  @Input() defaultColor: string = "transparent";
  @Input() highlightColor: string;
  @HostBinding('style.backgroundColor') backgroungColor: string = this.defaultColor;

  constructor(private renderer: Renderer2, private elRef: ElementRef) { }
  ngOnInit() {

  }

  @HostListener('mouseenter') mouseover(eventData: Event) {
    this.backgroungColor = this.highlightColor
  }
  @HostListener('mouseleave') mouseleave(eventData: Event) {

    this.backgroungColor = this.defaultColor;
  }
}
