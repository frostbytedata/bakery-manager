import { Component, OnInit } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '../../../shared/unsub-on-destroy';

@Component({
  selector: 'bm-inventory-batches',
  templateUrl: './batches.page.html',
  styleUrls: ['./batches.page.scss'],
})
export class BatchesPage extends UnsubscribeOnDestroyAdapter implements OnInit {
  loading = true;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}
