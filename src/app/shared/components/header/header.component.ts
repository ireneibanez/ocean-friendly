import { Component } from '@angular/core';

@Component ({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {

  menuMobileVisibility: boolean = false;

  toggleVisibilityMenuMobile() {
    this.menuMobileVisibility = !this.menuMobileVisibility;
  }
}
