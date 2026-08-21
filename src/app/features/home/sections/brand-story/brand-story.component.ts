import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HOME_CONTENT } from '../../../../config/content.config';
import { SITE_CONFIG } from '../../../../config/site.config';
import { EDITORIAL_IMAGES } from '../../../../config/editorial-images.config';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ImageComponent } from '../../../../shared/components/image/image.component';

@Component({
  selector: 'app-brand-story',
  standalone: true,
  imports: [RouterLink, ButtonComponent, ImageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './brand-story.component.html',
  styleUrl: './brand-story.component.scss'
})
export class BrandStoryComponent {
  protected readonly content = HOME_CONTENT.brandStory;
  protected readonly site = SITE_CONFIG;
  protected readonly image = EDITORIAL_IMAGES.matsFanned;
}
