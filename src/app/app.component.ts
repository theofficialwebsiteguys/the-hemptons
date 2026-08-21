import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AnnouncementBarComponent } from './layout/announcement-bar/announcement-bar.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { MobileMenuComponent } from './layout/mobile-menu/mobile-menu.component';
import { CartDrawerComponent } from './layout/cart-drawer/cart-drawer.component';
import { AgeGateComponent } from './layout/age-gate/age-gate.component';
import { CartStateService } from './core/state/cart-state.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AnnouncementBarComponent,
    HeaderComponent,
    FooterComponent,
    MobileMenuComponent,
    CartDrawerComponent,
    AgeGateComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private readonly cartState = inject(CartStateService);

  constructor() {
    this.cartState.initializeCart();
  }
}
