import { Component, HostListener, OnInit, TemplateRef } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterModule, RouterOutlet, UrlTree } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { filter } from 'rxjs';
import { NgZorroModule } from '../shared/Ng-ZorroModules';
import { MENU_ITEMS, MenuItem } from '../utils/sidebar-menu';

@Component({
  selector: 'app-layout',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [NgZorroModule, CommonModule, RouterLink, RouterModule, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  providers: [NzMessageService]
})
export class LayoutComponent implements OnInit{

  isCollapsed = true;
  isLargeScreen = window.innerWidth >= 1400;
  breadcrumbItems: {
    route: string | any[] | UrlTree | null | undefined;
    title: string;
    icon: string | null;
  }[] = [];

  menuItems: MenuItem[] = MENU_ITEMS;
suffixIconSearch: string|TemplateRef<void>|undefined;

  constructor(
    private router: Router,
    private message: NzMessageService,
    private activatedRoute: ActivatedRoute
  ) { }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.isLargeScreen = window.innerWidth >= 1400;
  }

  onCollapseChange(collapsed: boolean): void {
    this.isCollapsed = collapsed;
  }

  navigateToSettings() {
    this.router.navigate(['/settings']);
  }

  ngOnInit(): void {
    // Call the updateBreadcrumb method on initial load
    this.updateBreadcrumb();

    // Subscribe to NavigationEnd events to update the breadcrumb
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateBreadcrumb();
    });
  }

  confirmLogout() {
    // this.confirmationService.confirm({
    //   message: 'Are you sure you want to logout?',
    //   header: 'Logout Confirmation',
    //   icon: 'pi pi-exclamation-triangle',
    //   accept: () => {
    //     this.logout();
    //   },
    // });
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.message.success('Logged out successfully')
    this.router.navigateByUrl('/auth/login');
  }

  private updateBreadcrumb() {
    let routePath: ActivatedRoute | null = this.activatedRoute.root;
    const breadcrumbs: { title: string, icon: string | null, route: string }[] = [];

    // Traverse the route tree to build breadcrumbs
    while (routePath) {
      if (routePath.snapshot.data['breadcrumb']) {
        const breadcrumb = routePath.snapshot.data['breadcrumb'];
        breadcrumbs.push(breadcrumb);
      }
      routePath = routePath.firstChild;
    }

    this.breadcrumbItems = breadcrumbs.reverse();
  }

  getIconForRoute(route: string): string | null {
    const menuItem = MENU_ITEMS.find(item => item.route === route);
    return menuItem ? menuItem.icon ?? null : null;
  }

}
