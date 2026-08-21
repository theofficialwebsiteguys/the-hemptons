import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HOME_CONTENT } from '../../../../config/content.config';
import { COLLECTIONS_CONFIG } from '../../../../config/collections.config';
import { EDITORIAL_IMAGES } from '../../../../config/editorial-images.config';
import { ImageComponent } from '../../../../shared/components/image/image.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

/**
 * A dedicated homepage feature for Collector Glass (spec section 11) —
 * distinct from a generic "featured collection" banner because these
 * pieces are meant to be viewed like objects, not browsed like inventory.
 * Falls back to an honest "coming soon" state if the Glass collection
 * isn't configured yet, rather than linking anywhere or implying stock.
 */
@Component({
  selector: 'app-glass-story',
  standalone: true,
  imports: [RouterLink, ImageComponent, ButtonComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './glass-story.component.html',
  styleUrl: './glass-story.component.scss'
})
export class GlassStoryComponent {
  protected readonly content = HOME_CONTENT.glassStory;
  protected readonly image = EDITORIAL_IMAGES.glassIlladelph;
  protected readonly route = COLLECTIONS_CONFIG.glass ? `/collections/${COLLECTIONS_CONFIG.glass}` : null;
}
