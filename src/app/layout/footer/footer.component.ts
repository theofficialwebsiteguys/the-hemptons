import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE_CONFIG } from '../../config/site.config';
import { COLLECTIONS_CONFIG } from '../../config/collections.config';
import { IconComponent } from '../../shared/components/icon/icon.component';

interface FooterLink {
  label: string;
  route: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  protected readonly site = SITE_CONFIG;
  protected readonly year = new Date().getFullYear();

  protected readonly shopLinks: FooterLink[] = [
    COLLECTIONS_CONFIG.glass && { label: 'Glass', route: `/collections/${COLLECTIONS_CONFIG.glass}` },
    COLLECTIONS_CONFIG.apparel && { label: 'Apparel', route: `/collections/${COLLECTIONS_CONFIG.apparel}` },
    COLLECTIONS_CONFIG.moodMats && { label: 'Mood Mats', route: `/collections/${COLLECTIONS_CONFIG.moodMats}` },
    { label: 'Shop all', route: '/shop' }
  ].filter((link): link is FooterLink => !!link);

  protected readonly infoLinks: FooterLink[] = [
    { label: 'About', route: '/about' },
    { label: 'FAQ', route: '/faq' },
    { label: 'Shipping & Returns', route: '/shipping' },
    { label: 'Contact', route: '/contact' }
  ];

  protected readonly legalLinks: FooterLink[] = [
    { label: 'Privacy', route: '/privacy' },
    { label: 'Terms', route: '/terms' }
  ];
}
