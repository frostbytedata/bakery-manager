import { Component, OnInit } from '@angular/core';
import { UserStore } from '../../store/user.store';

@Component({
  selector: 'bm-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(protected userStore: UserStore) { }

  ngOnInit(): void {
  }

}
