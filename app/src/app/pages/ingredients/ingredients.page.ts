import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UnsubscribeOnDestroyAdapter } from '../../shared/unsub-on-destroy';
@Component({
  selector: 'bm-ingredients',
  templateUrl: './ingredients.page.html',
  styleUrls: ['./ingredients.page.scss'],
})
export class IngredientsPage
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  constructor(public route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {}
}
