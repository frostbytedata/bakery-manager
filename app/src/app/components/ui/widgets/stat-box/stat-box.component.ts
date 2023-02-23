import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'bm-stat-box',
  templateUrl: './stat-box.component.html',
  styleUrls: ['./stat-box.component.scss'],
})
export class StatBoxComponent implements OnInit {
  @Input() statValue: string | number | null = '';

  @Input() icon: string = 'bi-exclamation-circle';

  @Input() desc: string = '';

  @Input() colorClass: string = 'text-bm-dark_type';

  constructor() {}

  ngOnInit(): void {}
}
