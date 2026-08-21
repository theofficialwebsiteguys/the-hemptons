import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Collection } from '../../../core/models/collection.model';
import { ImageComponent } from '../image/image.component';

@Component({
  selector: 'app-collection-card',
  standalone: true,
  imports: [RouterLink, ImageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a class="collection-card" [routerLink]="['/collections', collection().handle]">
      <div class="collection-card__media">
        <app-image [image]="collection().image" [altFallback]="collection().title" />
        <div class="collection-card__overlay"></div>
        <h3 class="collection-card__title">{{ collection().title }}</h3>
      </div>
    </a>
  `,
  styleUrl: './collection-card.component.scss'
})
export class CollectionCardComponent {
  readonly collection = input.required<Collection>();
}
