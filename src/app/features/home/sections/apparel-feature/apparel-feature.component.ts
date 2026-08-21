import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HOME_CONTENT } from '../../../../config/content.config';
import { COLLECTIONS_CONFIG } from '../../../../config/collections.config';
import { EDITORIAL_IMAGES } from '../../../../config/editorial-images.config';
import { ImageComponent } from '../../../../shared/components/image/image.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-apparel-feature',
  standalone: true,
  imports: [RouterLink, ImageComponent, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './apparel-feature.component.html',
  styleUrl: './apparel-feature.component.scss'
})
export class ApparelFeatureComponent {
  protected readonly content = HOME_CONTENT.apparel;
  protected readonly teeWhite = EDITORIAL_IMAGES.teeWhite;
  protected readonly teeBlack = EDITORIAL_IMAGES.teeBlack;
  protected readonly route = COLLECTIONS_CONFIG.apparel ? `/collections/${COLLECTIONS_CONFIG.apparel}` : null;
}
