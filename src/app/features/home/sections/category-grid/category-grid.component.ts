import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HOME_CONTENT } from '../../../../config/content.config';
import { COLLECTIONS_CONFIG } from '../../../../config/collections.config';
import { EDITORIAL_IMAGES } from '../../../../config/editorial-images.config';
import { ImageComponent } from '../../../../shared/components/image/image.component';
import { ProductImage } from '../../../../core/models/image.model';

interface CategoryTile {
  key: string;
  label: string;
  copy: string;
  image: ProductImage | null;
  route: string | null;
  /** 'contain' for product-on-white shots (e.g. apparel flat-lays) so the garment is never cropped. */
  fit: 'cover' | 'contain';
}

@Component({
  selector: 'app-category-grid',
  standalone: true,
  imports: [RouterLink, ImageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './category-grid.component.html',
  styleUrl: './category-grid.component.scss'
})
export class CategoryGridComponent {
  protected readonly content = HOME_CONTENT.categories;

  protected readonly tiles: CategoryTile[] = [
    {
      key: 'glass',
      label: this.content.glass.label,
      copy: this.content.glass.copy,
      image: EDITORIAL_IMAGES.bongOnMat,
      route: COLLECTIONS_CONFIG.glass ? `/collections/${COLLECTIONS_CONFIG.glass}` : null,
      fit: 'cover'
    },
    {
      key: 'apparel',
      label: this.content.apparel.label,
      copy: this.content.apparel.copy,
      image: EDITORIAL_IMAGES.teeBlack,
      route: COLLECTIONS_CONFIG.apparel ? `/collections/${COLLECTIONS_CONFIG.apparel}` : null,
      fit: 'cover'
    },
    {
      key: 'moodMats',
      label: this.content.moodMats.label,
      copy: this.content.moodMats.copy,
      image: EDITORIAL_IMAGES.lifestylePavers,
      route: COLLECTIONS_CONFIG.moodMats ? `/collections/${COLLECTIONS_CONFIG.moodMats}` : null,
      fit: 'cover'
    }
  ];
}
