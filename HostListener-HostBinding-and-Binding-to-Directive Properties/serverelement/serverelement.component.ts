import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-serverelement',
  templateUrl: './serverelement.component.html',
  styleUrls: ['./serverelement.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ServerelementComponent implements OnInit {
  @Input('svrElement') element: { type: string; name: string, content: string }
  constructor() { }

  ngOnInit() {
  }

}
