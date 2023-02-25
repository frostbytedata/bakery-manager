import { Component, OnInit } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '../../../shared/unsub-on-destroy';

@Component({
  selector: 'bm-inventory-shrinkage',
  templateUrl: './shrinkage.page.html',
  styleUrls: ['./shrinkage.page.scss'],
})
export class ShrinkagePage extends UnsubscribeOnDestroyAdapter implements OnInit {
  loading = true;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}
