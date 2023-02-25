import { AfterContentChecked, Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  PRIMARY_OUTLET,
  Router,
  RouterEvent,
  UrlTree,
} from '@angular/router';
import { filter, map } from 'rxjs';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  children?: MenuItem[];
}

@Component({
  selector: 'bm-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit, AfterContentChecked {
  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'bi-layout-text-window-reverse',
      route: '/home',
    },
    {
      label: 'Inventory',
      icon: 'bi-box-seam',
      route: '/inventory',
      children: [
        {
          label: 'Overview',
          icon: 'bi-layout-text-window-reverse',
          route: '/inventory/overview',
        },
        {
          label: 'Production',
          icon: 'bi-cup-hot',
          route: '/inventory/production',
        },
        {
          label: 'Purchase Batches',
          icon: 'bi-tags',
          route: '/inventory/batches',
        },
        {
          label: 'Shrinkage',
          icon: 'bi-cart-x',
          route: '/inventory/shrinkage',
        },
        {
          label: 'Ingredients',
          icon: 'bi-egg',
          route: '/inventory/ingredients',
        },
      ],
    },
    {
      label: 'Recipes',
      icon: 'bi-card-checklist',
      route: '/recipes',
    },
    // {
    //   label: 'Conversions',
    //   icon: 'bi-repeat',
    //   route: '/conversions',
    // },
  ];
  subMenu: MenuItem[] = [];
  urlSegments: string[] = [];
  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events
      .pipe(
        // @ts-ignore
        filter((event: RouterEvent) => event instanceof NavigationEnd),
        map((event) => {
          console.info('router event: ', event);
          const tree: UrlTree = this.router.parseUrl(event.url);
          return tree.root.children[PRIMARY_OUTLET].segments.map(
            (seg) => seg.path,
          );
        }),
      )
      .subscribe((segs: string[]) => {
        this.urlSegments = segs;
      });
  }

  ngOnInit(): void {}

  ngAfterContentChecked(): void {
    this.hydrateSubMenu(this.urlSegments);
  }

  hydrateSubMenu(activeRouteSegments: string[]) {
    const activeMenu = this.menuItems.find(
      (item) => item.route === '/' + activeRouteSegments[0],
    );
    this.subMenu = activeMenu?.children || [];
  }
}
