import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UnsubscribeOnDestroyAdapter } from '../../shared/unsub-on-destroy';
@Component({
  selector: 'bm-home.page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage extends UnsubscribeOnDestroyAdapter implements OnInit {
  constructor(public route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {}
}
