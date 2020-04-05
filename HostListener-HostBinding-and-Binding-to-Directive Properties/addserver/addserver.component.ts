import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-addserver',
  templateUrl: './addserver.component.html',
  styleUrls: ['./addserver.component.css']
})
export class AddserverComponent implements OnInit {
  @Output("ServerC") serverCreated = new EventEmitter<{ serverName: string, serverContent: string }>();
  @Output("BlueprintC") blueprintCreated = new EventEmitter<{ serverName: string, serverContent: string }>()
  // newServerName = '';
  // newServerContent = '';
  @ViewChild('serverNameInput', { static: true }) serverNameInput: ElementRef;
  @ViewChild('serverContentInput', { static: true }) serverContentInput: ElementRef;
  constructor() { }

  ngOnInit() {
  }
  onServerAdd() {

    this.serverCreated.emit({
      serverName: this.serverNameInput.nativeElement.value,
      serverContent: this.serverContentInput.nativeElement.value
    })
  }
  onBlueprintAdd() {
    this.blueprintCreated.emit({
      serverName: this.serverNameInput.nativeElement.value,
      serverContent: this.serverContentInput.nativeElement.value
    })

  }

}
