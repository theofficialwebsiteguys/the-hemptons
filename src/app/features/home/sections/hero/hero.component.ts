import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HOME_CONTENT } from '../../../../config/content.config';
import { EDITORIAL_IMAGES } from '../../../../config/editorial-images.config';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ImageComponent } from '../../../../shared/components/image/image.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RouterLink, ButtonComponent, ImageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  protected readonly content = HOME_CONTENT.hero;
  protected readonly image = EDITORIAL_IMAGES.heroLifestyle;
}
