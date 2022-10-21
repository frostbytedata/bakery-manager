import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { map, Observable } from 'rxjs';
@Component({
  selector: 'bm-login.page',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  protected loginMode$: Observable<boolean> | undefined;
  constructor(public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loginMode$ = this.route.url.pipe(
      map((segments: UrlSegment[]) => {
        return segments.map((segment) => segment.path).includes('login');
      }),
    );
  }
}
