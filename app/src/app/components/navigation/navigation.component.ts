import { Component, OnInit } from '@angular/core';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'bm-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'bi-layout-text-window-reverse',
      route: '/home',
    },
    {
      label: 'Recipes',
      icon: 'bi-card-checklist',
      route: '/recipes',
    },
    {
      label: 'Ingredients',
      icon: 'bi-egg',
      route: '/ingredients',
    },
    {
      label: 'Conversions',
      icon: 'bi-repeat',
      route: '/conversions',
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
