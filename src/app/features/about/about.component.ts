import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SITE_CONFIG } from '../../config/site.config';
import { ABOUT_CONTENT } from '../../config/content.config';
import { EDITORIAL_IMAGES } from '../../config/editorial-images.config';
import { SeoService } from '../../core/seo/seo.service';
import { ImageComponent } from '../../shared/components/image/image.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [ImageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  protected readonly site = SITE_CONFIG;
  protected readonly content = ABOUT_CONTENT;
  protected readonly heroImage = EDITORIAL_IMAGES.lifestyleDeck;
  protected readonly secondaryImage = EDITORIAL_IMAGES.artworkCloseup;

  constructor() {
    inject(SeoService).update({ title: 'About', path: '/about' });
  }
}
