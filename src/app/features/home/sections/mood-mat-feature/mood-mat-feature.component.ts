import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HOME_CONTENT } from '../../../../config/content.config';
import { COLLECTIONS_CONFIG } from '../../../../config/collections.config';
import { EDITORIAL_IMAGES } from '../../../../config/editorial-images.config';
import { ImageComponent } from '../../../../shared/components/image/image.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-mood-mat-feature',
  standalone: true,
  imports: [RouterLink, ImageComponent, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './mood-mat-feature.component.html',
  styleUrl: './mood-mat-feature.component.scss'
})
export class MoodMatFeatureComponent {
  protected readonly content = HOME_CONTENT.moodMats;
  protected readonly primaryImage = EDITORIAL_IMAGES.matBadge;
  protected readonly secondaryImages = [EDITORIAL_IMAGES.lifestyleChairs, EDITORIAL_IMAGES.detailStack];
  protected readonly route = COLLECTIONS_CONFIG.moodMats ? `/collections/${COLLECTIONS_CONFIG.moodMats}` : null;
}
