import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'bm-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Output() bmClick = new EventEmitter<Event>();
  @Input() icon: string = '';
  @Input() disabled: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
