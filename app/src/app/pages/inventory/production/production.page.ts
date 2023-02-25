import { Component, OnInit } from '@angular/core';
import { UnsubscribeOnDestroyAdapter } from '../../../shared/unsub-on-destroy';

@Component({
  selector: 'bm-inventory-production',
  templateUrl: './production.page.html',
  styleUrls: ['./production.page.scss'],
})
export class ProductionPage extends UnsubscribeOnDestroyAdapter implements OnInit {
  loading = true;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }
}
